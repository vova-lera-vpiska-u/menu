import { attach, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

import { recipesApi } from '@shared/api'
import { Recipe, Tag, UpdateRecipeRequest } from '@shared/api/recipes'

export const RecipePageGate = createGate<string>()

export const recipeUpdated = createEvent<UpdateRecipeRequest>()

export const $recipe = createStore<Recipe | null>(null)
export const $recipes = createStore<Recipe[] | null>(null)
export const $categories = createStore<Tag[] | null>(null)

const getRecipeFx = attach({ effect: recipesApi.getRecipeFx })
const updateRecipeFx = attach({ effect: recipesApi.updateRecipeFx })
export const getRecipesFx = attach({ effect: recipesApi.getRecipesFx })
export const getSectionRecipesFx = attach({ effect: recipesApi.getSectionRecipesFx })
export const getCategoriesFx = attach({ effect: recipesApi.getCategoriesFx })

sample({
    clock: RecipePageGate.open,
    target: [getRecipeFx, getCategoriesFx],
})

sample({
    clock: recipeUpdated,
    target: updateRecipeFx,
})

sample({
    clock: [getRecipeFx.doneData, updateRecipeFx.doneData],
    target: $recipe,
})

sample({
    clock: [getRecipesFx.doneData, getSectionRecipesFx.doneData],
    target: $recipes,
})

sample({ clock: getCategoriesFx.doneData, target: $categories })

$recipe.reset(RecipePageGate.close)
