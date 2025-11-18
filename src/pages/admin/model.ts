import { attach, createEffect, createEvent, createStore, sample } from 'effector'

import { recipesModel } from '@entities/recipe'

import { recipesApi } from '@shared/api'
import { url } from '@shared/api/consts'
import { Ingredient } from '@shared/api/recipes'

export const $ingredients = createStore<Ingredient[] | null>(null)
export const adminPageMounted = createEvent()
export const adminPageUnMounted = createEvent()
export const createRecipeClicked = createEvent<CreateRecipeRequest>()

type Section = {
    _id: string
    name: string
    recipes: string[]
}
export const $sections = createStore<Section[] | null>(null)
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
    const response = await fetch(`${url}/sections`)
    return await response.json()
})

sample({
    clock: adminPageMounted,
    target: [recipesModel.getCategoriesFx, getRecipesFx, getIngredientsFx, getSectionsFx],
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

        fetch(`${url}/recipes/`, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        })
    },
)

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
