import { createEvent, createStore, sample } from 'effector'
import { getCategoriesFx, getRecipesFx } from './api'
import { Category, Recipe } from '../../api/types'

export const appStarted = createEvent()

export const $recipes = createStore<Recipe[] | null>(null)
export const $categories = createStore<Category[] | null>(null)

sample({
  clock: getRecipesFx.doneData,
  fn: (res) => {
    return res
  },
  target: $recipes,
})
sample({ clock: getCategoriesFx.doneData, target: $categories })
