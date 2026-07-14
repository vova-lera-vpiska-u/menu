import { attach, createEvent, createStore, sample } from 'effector'
import { debounce } from 'patronum'

import { recipesModel } from '@entities/recipe'

import { Recipe } from '@shared/api/recipes'

const getRecipesFx = attach({ effect: recipesModel.getRecipesFx })

export const $searchQuery = createStore<string>('')
export const $recipes = createStore<Recipe[] | null>(null)

export const searchQueryChanged = createEvent<string>()

$searchQuery.on(searchQueryChanged, (_, query) => query)

sample({
    clock: debounce({
        source: $searchQuery,
        timeout: 300,
    }),
    filter: Boolean,
    target: getRecipesFx,
})

sample({
    clock: $searchQuery,
    filter: (query) => !query,
    target: $recipes.reinit,
})

sample({
    clock: getRecipesFx.doneData,
    target: $recipes,
})
