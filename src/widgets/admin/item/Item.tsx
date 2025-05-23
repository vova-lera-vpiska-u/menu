import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useUnit } from 'effector-react'

import { Recipe } from '@shared/api/types'
import { $categories } from '@shared/model'
import { Image } from '@shared/ui/image'

import { recipePageMounted, recipePageUnMounted, updateRecipeFx } from './model'

export const Item = () => {
    const { id } = useParams()
    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const categories = useUnit($categories)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setRecipe({
            ...recipe,
            [event.target.name]: event.target.value,
        })
    }

    useEffect(() => {
        if (id) recipePageMounted(id)
        return () => recipePageUnMounted()
    }, [id])

    if (!recipe || !id) return null
    return (
        <div>
            <Link to={'/admin'}>go back</Link>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    updateRecipeFx({ recipe, id })
                }}
            >
                <Image src={recipe.image} width="200" height="200" alt="" />
                <div>
                    name: <input name="name" type="text" value={recipe.name} onChange={handleChange} />
                </div>
                <div>
                    recipe: <input name="recipe" type="text" value={recipe.recipe} onChange={handleChange} />
                </div>
                <div>
                    description:{' '}
                    <input name="description" type="text" value={recipe.description} onChange={handleChange} />
                </div>
                <div>
                    image: <input name="image" type="text" value={recipe.image} onChange={handleChange} />
                </div>
                <div>
                    time: <input name="timeToCook" type="text" value={recipe.timeToCook} onChange={handleChange} />
                </div>
                <div>ingredients</div>
                <div>
                    {categories?.map((category) => {
                        return (
                            <div key={category._id}>
                                {category.name}:{' '}
                                <input
                                    type="checkbox"
                                    checked={recipe.categories.some((category) => category._id === category._id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setRecipe({
                                                ...recipe,
                                                categories: [
                                                    ...recipe.categories,
                                                    {
                                                        _id: category._id,
                                                        name: category.name,
                                                    },
                                                ],
                                            })
                                        } else {
                                            setRecipe({
                                                ...recipe,
                                                categories: recipe.categories.filter(
                                                    (category) => category._id !== category._id,
                                                ),
                                            })
                                        }
                                    }}
                                />
                            </div>
                        )
                    })}
                </div>
                <div>
                    rating: <input name="rating" type="text" value={recipe.rating} onChange={handleChange} />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
