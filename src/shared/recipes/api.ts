import { createEffect } from 'effector'
import { url } from '../../api/consts'
import { Category, Recipe } from '../../api/types'

export const getRecipesFx = createEffect(
  async (section?: string): Promise<Recipe[]> => {
    const response = await fetch(
      `${url}/${section ? `sections/${section}` : `recipes`}/`
    )
    return await response.json()
  }
)

export const getCategoriesFx = createEffect(async (): Promise<Category[]> => {
  const response = await fetch(`${url}/categories`)
  return await response.json()
})
