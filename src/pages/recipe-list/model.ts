import { sample } from 'effector'
import { createGate } from 'effector-react'

import { recipesModel } from '@entities/recipe'

export const RecipesListGate = createGate<string>()

sample({
    clock: RecipesListGate.open,
    fn: (title) => (title === 'ALL' ? '' : title.toLowerCase()),
    target: [recipesModel.getRecipesFx],
})
