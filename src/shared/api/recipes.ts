import { createEffect } from 'effector'

import { url } from './consts'
import { Recipe } from './types'

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
