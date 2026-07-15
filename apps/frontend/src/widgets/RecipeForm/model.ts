import { createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

import { recipesModel } from '@entities/recipe'

import { url } from '@shared/api/consts'
import { db } from '@shared/api/db'
import { Category, Tag } from '@shared/api/recipes'

// types
export type Nutrition = {
    calories: string
    protein: string
    fat: string
    carbs: string
}

export type IngredientFormRow = {
    name: string
    amount: string
    unit: string
    optional: boolean
}

// consts
export const UNIT_OPTIONS = ['g', 'kg', 'ml', 'l', 'pcs', 'tsp', 'tbsp', 'pinch']

export const EMPTY_INGREDIENT: IngredientFormRow = { name: '', amount: '', unit: '', optional: false }

export type CreateRecipePayload = {
    name: string
    section: string
    categories: string[]
    ingredients: IngredientFormRow[]
    image?: File | null
    recipe?: string
    timeToCook?: string
    rating?: number
    nutrition?: Nutrition
}

export type UpdateRecipePayload = {
    id: string
    name: string
    categoryId: string
    categories: string[]
    ingredients: IngredientFormRow[]
    recipe: string | null
    rating: number | null
    timeToCook: number | null
    nutrition?: Nutrition
}

// effects
export const getSectionsFx = createEffect(async (): Promise<Category[] | null> => {
    const { data } = await db.from('categories').select('*')
    return data
})

export const createRecipeFx = createEffect(async (payload: CreateRecipePayload): Promise<string> => {
    const formData = new FormData()
    formData.append('name', payload.name)
    formData.append('section', payload.section)
    formData.append('categories', JSON.stringify(payload.categories))
    formData.append('ingredients', JSON.stringify(payload.ingredients))
    if (payload.recipe) formData.append('recipe', payload.recipe)
    if (payload.timeToCook) formData.append('timeToCook', payload.timeToCook)
    if (payload.rating) formData.append('rating', payload.rating.toString())
    if (payload.nutrition) formData.append('nutrition', JSON.stringify(payload.nutrition))
    if (payload.image) formData.append('image', payload.image)

    const response = await fetch(`${url}/recipes`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
    })
    if (!response.ok) throw new Error(String(response.status))

    const created: { id: string } = await response.json()
    return created.id
})

export const updateRecipeFx = createEffect(async (payload: UpdateRecipePayload) => {
    const body = {
        name: payload.name,
        category_id: payload.categoryId,
        recipe: payload.recipe,
        rating: payload.rating,
        time_to_cook: payload.timeToCook,
        calories: toNumberOrNull(payload.nutrition?.calories),
        protein: toNumberOrNull(payload.nutrition?.protein),
        fat: toNumberOrNull(payload.nutrition?.fat),
        carbs: toNumberOrNull(payload.nutrition?.carbs),
        tags: payload.categories,
        ingredients: payload.ingredients,
    }

    const response = await fetch(`${url}/recipes/${payload.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error(String(response.status))
})

export const createTagFx = createEffect(async (name: string): Promise<Tag> => {
    const response = await fetch(`${url}/categories`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    })
    if (!response.ok) throw new Error(String(response.status))
    return await response.json()
})

export const deleteRecipeFx = createEffect(async (id: string) => {
    const response = await fetch(`${url}/recipes/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    })
    if (!response.ok) throw new Error(String(response.status))
})

// gates
export const RecipeFormGate = createGate()

// stores
export const $sections = createStore<Category[] | null>(null)
export const $sectionOptions = $sections.map((sections) => sections?.map((section) => section.name) ?? [])
export const $formError = createStore<string | null>(null)
export const $updateDoneCount = createStore(0)
export const $deleteDoneCount = createStore(0)
export const $createdRecipeId = createStore<string | null>(null)
export const $lastCreatedTag = createStore<Tag | null>(null)

// events
export const createRecipeClicked = createEvent<CreateRecipePayload>()
export const updateRecipeClicked = createEvent<UpdateRecipePayload>()
export const deleteRecipeClicked = createEvent<string>()
export const tagCreated = createEvent<string>()

// logic
sample({
    clock: RecipeFormGate.open,
    target: [getSectionsFx, recipesModel.getCategoriesFx],
})

sample({
    clock: createRecipeClicked,
    target: createRecipeFx,
})

sample({
    clock: updateRecipeClicked,
    target: updateRecipeFx,
})

sample({
    clock: deleteRecipeClicked,
    target: deleteRecipeFx,
})

sample({
    clock: tagCreated,
    filter: (name) => name.trim().length > 0,
    fn: (name) => name.trim(),
    target: createTagFx,
})

sample({
    clock: getSectionsFx.doneData,
    target: $sections,
})

// Refresh the tag list after a new tag is created, then remember the created
// tag so the form can auto-select it once the refreshed list arrives.
sample({
    clock: createTagFx.done,
    target: recipesModel.getCategoriesFx,
})

sample({
    clock: createTagFx.doneData,
    target: $lastCreatedTag,
})

sample({
    clock: [
        createRecipeClicked,
        updateRecipeClicked,
        createRecipeFx.done,
        updateRecipeFx.done,
        deleteRecipeClicked,
        tagCreated,
        createTagFx.done,
    ],
    fn: () => null,
    target: $formError,
})

sample({
    clock: [createRecipeFx.failData, updateRecipeFx.failData, deleteRecipeFx.failData, createTagFx.failData],
    fn: (error) => (error.message === '401' ? 'Session expired — please log in again' : 'Something went wrong'),
    target: $formError,
})

sample({
    clock: [createRecipeFx.done, updateRecipeFx.done, deleteRecipeFx.done],
    fn: () => undefined,
    target: recipesModel.getRecipesFx,
})

$updateDoneCount.on(updateRecipeFx.done, (count) => count + 1)
$deleteDoneCount.on(deleteRecipeFx.done, (count) => count + 1)
$createdRecipeId.on(createRecipeFx.doneData, (_, id) => id)

// Clear the "just created" tag on (re)mount so a stale one isn't auto-selected.
$lastCreatedTag.reset(RecipeFormGate.open)

// Clear a stale created id on (re)mount so we don't navigate away immediately.
$createdRecipeId.reset(RecipeFormGate.open)

// utility functions
function toNumberOrNull(raw?: string): number | null {
    if (!raw || !raw.trim()) return null
    const parsed = Number(raw)
    return Number.isFinite(parsed) ? parsed : null
}
