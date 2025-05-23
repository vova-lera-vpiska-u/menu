import { createEffect, createEvent, createStore, sample } from 'effector'

import { url } from './api/consts'
import { Category, Ingredient, Recipe } from './api/types'

export const appStarted = createEvent()

export const $recipes = createStore<Recipe[] | null>(null)
export const $categories = createStore<Category[] | null>(null)

export const getRecipesFx = createEffect(async (section?: string): Promise<Recipe[]> => {
    const response = await fetch(`${url}/${section ? `sections/${section}` : `recipes`}`)
    return await response.json()
})

export const getCategoriesFx = createEffect(async (): Promise<Category[]> => {
    const response = await fetch(`${url}/categories`)
    return await response.json()
})

export const getIngredientsFx = createEffect(async (): Promise<Ingredient[]> => {
    const response = await fetch(`${url}/ingredients`)
    return await response.json()
})

sample({
    clock: getRecipesFx.doneData,
    fn: (res) => {
        return res
    },
    target: $recipes,
})
sample({ clock: getCategoriesFx.doneData, target: $categories })
$recipes.reset(getRecipesFx)
