import { attach, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

import { recipesApi } from '@shared/api'
import { UpdateRecipeRequest } from '@shared/api/recipes'
import { Recipe } from '@shared/api/types'

export const RecipePageGate = createGate<string>()

export const recipeUpdated = createEvent<UpdateRecipeRequest>()

export const $recipe = createStore<Recipe | null>(null)

const getRecipeFx = attach({ effect: recipesApi.getRecipeFx })
const updateRecipeFx = attach({ effect: recipesApi.updateRecipeFx })

sample({
    clock: RecipePageGate.open,
    target: getRecipeFx,
})

sample({
    clock: recipeUpdated,
    target: updateRecipeFx,
})

sample({
    clock: [getRecipeFx.doneData, updateRecipeFx.doneData],
    target: $recipe,
})

$recipe.reset(RecipePageGate.close)
