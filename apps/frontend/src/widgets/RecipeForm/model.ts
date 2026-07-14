import { createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

import { recipesModel } from '@entities/recipe'

import { url } from '@shared/api/consts'
import { db } from '@shared/api/db'
import { Category } from '@shared/api/recipes'

// types
export type Nutrition = {
    calories: string
    protein: string
    fat: string
    carbs: string
}

export type CreateRecipePayload = {
    name: string
    section: string
    categories: string[]
    image: File
    timeToCook?: string
    rating?: number
    nutrition?: Nutrition
}

export type UpdateRecipePayload = {
    id: string
    name: string
    categoryId: string
    categories: string[]
    rating: number | null
    timeToCook: number | null
    nutrition?: Nutrition
}

// effects
export const getSectionsFx = createEffect(async (): Promise<Category[] | null> => {
    const { data } = await db.from('categories').select('*')
    return data
})

export const createRecipeFx = createEffect(async (payload: CreateRecipePayload) => {
    const formData = new FormData()
    formData.append('name', payload.name)
    formData.append('section', payload.section)
    formData.append('categories', JSON.stringify(payload.categories))
    if (payload.timeToCook) formData.append('timeToCook', payload.timeToCook)
    if (payload.rating) formData.append('rating', payload.rating.toString())
    if (payload.nutrition) formData.append('nutrition', JSON.stringify(payload.nutrition))
    formData.append('image', payload.image)

    const response = await fetch(`${url}/recipes`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
    })
    if (!response.ok) throw new Error(String(response.status))
})

export const updateRecipeFx = createEffect(async (payload: UpdateRecipePayload) => {
    const body = {
        name: payload.name,
        category_id: payload.categoryId,
        rating: payload.rating,
        time_to_cook: payload.timeToCook,
        calories: toNumberOrNull(payload.nutrition?.calories),
        protein: toNumberOrNull(payload.nutrition?.protein),
        fat: toNumberOrNull(payload.nutrition?.fat),
        carbs: toNumberOrNull(payload.nutrition?.carbs),
        tags: payload.categories,
    }

    const response = await fetch(`${url}/recipes/${payload.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error(String(response.status))
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

// events
export const createRecipeClicked = createEvent<CreateRecipePayload>()
export const updateRecipeClicked = createEvent<UpdateRecipePayload>()
export const deleteRecipeClicked = createEvent<string>()

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
    clock: getSectionsFx.doneData,
    target: $sections,
})

sample({
    clock: [createRecipeClicked, updateRecipeClicked, createRecipeFx.done, updateRecipeFx.done, deleteRecipeClicked],
    fn: () => null,
    target: $formError,
})

sample({
    clock: [createRecipeFx.failData, updateRecipeFx.failData, deleteRecipeFx.failData],
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

// utility functions
function toNumberOrNull(raw?: string): number | null {
    if (!raw || !raw.trim()) return null
    const parsed = Number(raw)
    return Number.isFinite(parsed) ? parsed : null
}
