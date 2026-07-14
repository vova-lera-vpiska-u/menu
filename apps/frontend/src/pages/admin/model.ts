import { attach, createEffect, createEvent, createStore, sample } from 'effector'

import { recipesModel } from '@entities/recipe'

import { recipesApi } from '@shared/api'
import { url } from '@shared/api/consts'
import { db } from '@shared/api/db'
import { Category, Ingredient } from '@shared/api/recipes'

export const $ingredients = createStore<Ingredient[] | null>(null)
export const adminPageMounted = createEvent()
export const adminPageUnMounted = createEvent()
export const createRecipeClicked = createEvent<CreateRecipeRequest>()

export const $sections = createStore<Category[] | null>(null)
export const $sectionOptions = $sections.map((sections) => sections?.map((section) => section.name) ?? [])
export const $nutrition = createStore<Nutrition>({
    calories: '',
    protein: '',
    fat: '',
    carbs: '',
})

export const setNutrition = createEvent<Nutrition>()

$nutrition.on(setNutrition, (_, nutrition) => nutrition)

const getRecipesFx = attach({ effect: recipesApi.getRecipesFx })
const getIngredientsFx = attach({ effect: recipesApi.getIngredientsFx })
export const getSectionsFx = createEffect(async () => {
    const { data } = await db.from('categories').select('*')
    return data
})

sample({
    clock: adminPageMounted,
    target: [recipesModel.getCategoriesFx, getRecipesFx, getIngredientsFx, getSectionsFx],
})

export const createCategoryFx = createEffect(async (name: string) => {
    const response = await fetch(`${url}/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name }),
    })
    if (!response.ok) throw new Error(response.statusText)
})
type Nutrition = {
    calories: string
    protein: string
    fat: string
    carbs: string
}

type CreateRecipeRequest = {
    name: string
    section: string
    categories: string[]
    image: File
    timeToCook?: string
    rating?: number
    nutrition?: Nutrition
}
export const createRecipeFx = createEffect(
    async ({ image, categories, name, section, timeToCook, rating, nutrition }: CreateRecipeRequest) => {
        const formData = new FormData()

        formData.append('name', name)
        formData.append('section', section)
        formData.append('categories', JSON.stringify(categories))
        if (timeToCook) formData.append('timeToCook', timeToCook)
        if (rating) formData.append('rating', rating.toString())
        if (nutrition) formData.append('nutrition', JSON.stringify(nutrition))
        formData.append('image', image)

        const response = await fetch(`${url}/recipes`, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        })
        if (!response.ok) throw new Error(response.statusText)
    },
)

export const deleteRecipeFx = createEffect(async (id: string) => {
    const response = await fetch(`${url}/recipes/${id}`, {
        credentials: 'include',
        method: 'DELETE',
    })
    if (!response.ok) throw new Error(response.statusText)
})

export const createSectionFx = createEffect(async (name: string) => {
    const response = await fetch(`${url}/sections`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
        credentials: 'include',
    })
    if (!response.ok) throw new Error(response.statusText)
})

type CreateIngredientRequest = {
    name: string
    category?: string
    description?: string
}
export const createIngredientFx = createEffect(async ({ name, category, description }: CreateIngredientRequest) => {
    const response = await fetch(`${url}/ingredients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, category, description }),
    })
    if (!response.ok) throw new Error(response.statusText)
})
sample({
    clock: createRecipeClicked,
    target: createRecipeFx,
})

sample({
    clock: getIngredientsFx.doneData,
    target: $ingredients,
})
sample({
    clock: getSectionsFx.doneData,
    target: $sections,
})
sample({
    clock: createIngredientFx.doneData,
    target: getIngredientsFx,
})
sample({
    clock: createCategoryFx.doneData,
    target: recipesModel.getCategoriesFx,
})
sample({
    clock: [createRecipeFx.doneData, deleteRecipeFx.doneData],
    target: getRecipesFx,
})

$ingredients.reset(adminPageUnMounted)
