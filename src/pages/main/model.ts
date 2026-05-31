import { attach, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

import { recipesModel } from '@entities/recipe'

import { Recipe } from '@shared/api/recipes'

const getFeaturedFx = attach({ effect: recipesModel.getRecipesFx })

export const MainPageGate = createGate()

export const $featured = createStore<Recipe[] | null>(null)

sample({
    clock: MainPageGate.open,
    fn: () => undefined,
    target: getFeaturedFx,
})

sample({
    clock: getFeaturedFx.doneData,
    target: $featured,
})
