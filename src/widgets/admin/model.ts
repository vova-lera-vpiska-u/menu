import { createEffect, createEvent, createStore, sample } from 'effector'

import { url } from '../../shared/api/consts'
import { Ingredient } from '../../shared/api/types'
import { getCategoriesFx, getIngredientsFx, getRecipesFx } from '../../shared/model'

export const $ingredients = createStore<Ingredient[] | null>(null)
export const adminPageMounted = createEvent()
export const adminPageUnMounted = createEvent()
sample({
    clock: adminPageMounted,
    target: [getCategoriesFx, getRecipesFx, getIngredientsFx],
})

export const createCategoryFx = createEffect(async (name: string) => {
    await fetch(`${url}/categories/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name }),
    })
})

export const createRecipeFx = createEffect(async ({ name, categories }: { name: string; categories: string[] }) => {
    fetch(`${url}/recipes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            name,
            categories,
            rating: 0,
            image: '',
        }),
    })
})

export const deleteRecipeFx = createEffect(async (id: string) => {
    fetch(`${url}/recipes/${id}`, {
        credentials: 'include',
        method: 'DELETE',
    })
})

export const createSectionFx = createEffect(async ({ name, recipes }: { name: string; recipes: string[] }) => {
    fetch(`${url}/sections/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            recipes: recipes,
        }),
        credentials: 'include',
    })
})

export const createIngredientFx = createEffect(async ({ name, price }: { name: string; price: string }) => {
    fetch(`${url}/ingredients/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        credentials: 'include',
        body: JSON.stringify({ name, price }),
    })
})

sample({
    clock: getIngredientsFx.doneData,
    target: $ingredients,
})
sample({
    clock: createIngredientFx.doneData,
    target: getIngredientsFx,
})
sample({
    clock: createCategoryFx.doneData,
    target: getCategoriesFx,
})
sample({
    clock: [createRecipeFx.doneData, deleteRecipeFx.doneData],
    target: getRecipesFx,
})

$ingredients.reset(adminPageUnMounted)
