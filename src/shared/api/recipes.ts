import { createEffect } from 'effector'

import { url } from './consts'
import { Category, Ingredient, Recipe } from './types'

export const getRecipesFx = createEffect(async (section?: string): Promise<Recipe[]> => {
    const response = await fetch(`${url}/${section ? `sections/${section}` : `recipes`}`)
    return await response.json()
})

export const getRecipeFx = createEffect(async (id: string) => {
    const response = await fetch(`${url}/recipes/${id}`)
    return await response.json()
})

export type UpdateRecipeRequest = { recipe: Recipe; id: string }
export const updateRecipeFx = createEffect(async ({ recipe, id }: UpdateRecipeRequest) => {
    const response = await fetch(`${url}/recipes/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
    })
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
