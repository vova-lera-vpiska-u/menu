import { createEffect } from 'effector'

import { url } from './consts'
import { db } from './db'
import { Tables } from './supabase'

export type Recipe = Tables<'food'> & {
    category: Category
    tags: { tag: Tag | null }[]
    ingredients: { ingredient: Ingredient | null }[]
}
export type Ingredient = Tables<'ingredients'>
export type Category = Tables<'categories'>
export type Tag = Tables<'tags'>

export const getRecipesFx = createEffect(async (name?: string): Promise<Recipe[] | null> => {
    if (name)
        return (
            await db
                .from('food')
                .select(
                    '*, category:categories!inner(*), tags:food_tags(tag:tags(*)), ingredients:food_ingredients(ingredient:ingredients(*))',
                )
                .like('name', `%${name}%`)
        ).data
    return (
        await db
            .from('food')
            .select(
                '*, category:categories!inner(*), tags:food_tags(tag:tags(*)), ingredients:food_ingredients(ingredient:ingredients(*))',
            )
    ).data
})

export const getSectionRecipesFx = createEffect(async (section: string) => {
    return (
        await db
            .from('food')
            .select(
                '*, category:categories!inner(*), tags:food_tags(tag:tags(*)), ingredients:food_ingredients(ingredient:ingredients(*))',
            )
            .eq('categories.name', section)
    ).data
})

export const getRecipeFx = createEffect(async (id: string) => {
    return (
        await db
            .from('food')
            .select(
                '*, category:categories!inner(*), tags:food_tags(tag:tags(*)), ingredients:food_ingredients(ingredient:ingredients(*))',
            )
            .eq('id', id)
            .single()
    ).data
})

export type UpdateRecipeRequest = { recipe: Recipe; id: string }
export const updateRecipeFx = createEffect(async ({ recipe, id }: UpdateRecipeRequest) => {
    const response = await fetch(`${url}/recipes/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
    })
    return await response.json()
})

export const getCategoriesFx = createEffect(async () => {
    return (await db.from('tags').select('*')).data
})

export const getIngredientsFx = createEffect(async () => {
    return (await db.from('ingredients').select('*')).data
})
