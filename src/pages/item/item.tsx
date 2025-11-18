import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useGate, useUnit } from 'effector-react'

import { recipesModel } from '@entities/recipe'

import { Recipe } from '@shared/api/recipes'
import { ADMIN_PATH } from '@shared/routes/private-paths'
import { Image } from '@shared/ui/image'

export const Item = () => {
    const { id } = useParams()
    useGate(recipesModel.RecipePageGate, id)
    const [recipeUpdated] = useUnit([recipesModel.recipeUpdated])
    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const categories = useUnit(recipesModel.$categories)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setRecipe({
            ...recipe,
            [event.target.name]: event.target.value,
        })
    }

    if (!recipe || !id) return null

    return (
        <div>
            <Link to={ADMIN_PATH}>go back</Link>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    recipeUpdated({ recipe, id })
                }}
            >
                {recipe.cover_url && <Image src={recipe.cover_url} width="200" height="200" alt="" />}
                <div>
                    name: <input name="name" type="text" value={recipe.name} onChange={handleChange} />
                </div>
                {recipe.recipe && (
                    <div>
                        recipe: <input name="recipe" type="text" value={recipe.recipe} onChange={handleChange} />
                    </div>
                )}
                {recipe.description && (
                    <div>
                        description:{' '}
                        <input name="description" type="text" value={recipe.description} onChange={handleChange} />
                    </div>
                )}
                {recipe.cover_url && (
                    <div>
                        image: <input name="image" type="text" value={recipe.cover_url} onChange={handleChange} />
                    </div>
                )}
                {recipe.time_to_cook && (
                    <div>
                        time:{' '}
                        <input name="timeToCook" type="text" value={recipe.time_to_cook} onChange={handleChange} />
                    </div>
                )}
                <div>ingredients</div>
                <div>
                    {categories?.map((category) => {
                        return (
                            <div key={category.id}>
                                {category.name}:{' '}
                                <input
                                    type="checkbox"
                                    checked={recipe.tags.some((c) => c.tag?.id === category.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setRecipe({
                                                ...recipe,
                                                tags: [...recipe.tags, { tag: category }],
                                            })
                                        } else {
                                            setRecipe({
                                                ...recipe,
                                                tags: recipe.tags.filter((c) => c.tag?.id !== category.id),
                                            })
                                        }
                                    }}
                                />
                            </div>
                        )
                    })}
                </div>
                {recipe.rating && (
                    <div>
                        rating: <input name="rating" type="text" value={recipe.rating} onChange={handleChange} />
                    </div>
                )}

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
