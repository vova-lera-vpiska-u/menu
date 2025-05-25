import { createEvent, sample } from 'effector'
import { createGate } from 'effector-react'
import { condition } from 'patronum'

import { recipesModel } from '@entities/recipe'

export const RecipesListGate = createGate<string>()

const sectionRecipesRequested = createEvent<string>()
const allRecipesRequested = createEvent()

condition({
    source: RecipesListGate.open,
    if: (title) => title !== 'ALL',
    then: sectionRecipesRequested,
    else: allRecipesRequested,
})

sample({
    clock: sectionRecipesRequested,
    fn: (title) => title.toLowerCase(),
    target: recipesModel.getSectionRecipesFx,
})

sample({
    clock: allRecipesRequested,
    target: recipesModel.getRecipesFx,
})
