import { createEffect, createEvent, createStore, sample } from 'effector'
import { Recipe } from '../../../api/types'
import { url } from '../../../api/consts'

export const $recipe = createStore<Recipe | null>(null)

export const recipePageMounted = createEvent<string>()
export const recipePageUnMounted = createEvent()

export const getRecipeFx = createEffect(async (id: string) => {
  const response = await fetch(`${url}/recipes/${id}`)
  return await response.json()
})
export const updateRecipeFx = createEffect(
  async ({ recipe, id }: { recipe: Recipe; id: string }) => {
    const response = await fetch(`${url}/recipes/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })
    return await response.json()
  }
)

sample({
  clock: recipePageMounted,
  target: getRecipeFx,
})
sample({
  clock: [getRecipeFx.doneData, updateRecipeFx.doneData],
  target: $recipe,
})

$recipe.reset(recipePageUnMounted)
