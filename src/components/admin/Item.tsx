import { useEffect, useState } from 'react'
import { Dish } from '../../api/types'
import { url } from '../../api/consts'
import { Link, useParams } from 'react-router-dom'

export const Item = () => {
  const { id } = useParams()
  const [dish, setDish] = useState<Dish | null>(null)
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  )
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name, event.target.value)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setDish({
      ...dish,
      [event.target.name]: event.target.value,
    })
  }

  useEffect(() => {
    fetch(`${url}/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDish(data)
      })

    fetch(`${url}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
      })
  }, [id])

  if (!dish) return null
  return (
    <div>
      <Link to={'/admin'}>go back</Link>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          console.log(dish)
          fetch(`${url}/recipes/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dish),
          })
            .then((res) => res.json())
            .then((data) => setDish(data))
        }}
      >
        <img src={dish.image} width="200" height="200" alt="" />
        <div>
          name:{' '}
          <input
            name="name"
            type="text"
            value={dish.name}
            onChange={handleChange}
          />
        </div>
        <div>
          recipe:{' '}
          <input
            name="recipe"
            type="text"
            value={dish.recipe}
            onChange={handleChange}
          />
        </div>
        <div>
          description:{' '}
          <input
            name="description"
            type="text"
            value={dish.description}
            onChange={handleChange}
          />
        </div>
        <div>
          image:{' '}
          <input
            name="image"
            type="text"
            value={dish.image}
            onChange={handleChange}
          />
        </div>
        <div>
          time:{' '}
          <input
            name="timeToCook"
            type="text"
            value={dish.timeToCook}
            onChange={handleChange}
          />
        </div>
        <div>ingredients</div>
        <div>
          {categories.map((category) => {
            return (
              <div key={category._id}>
                {category.name}:{' '}
                <input
                  type="checkbox"
                  checked={dish.categories.some(
                    (category) => category._id === category._id
                  )}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setDish({
                        ...dish,
                        categories: [
                          ...dish.categories,
                          {
                            _id: category._id,
                            name: category.name,
                          },
                        ],
                      })
                    } else {
                      setDish({
                        ...dish,
                        categories: dish.categories.filter(
                          (category) => category._id !== category._id
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
          rating:{' '}
          <input
            name="rating"
            type="text"
            value={dish.rating}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
