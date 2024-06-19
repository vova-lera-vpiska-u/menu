import { useEffect, useState } from 'react'
import { url } from '../../api/consts'
import { Dish } from '../../api/types'
import { Link } from 'react-router-dom'

export const Admin = () => {
  const [name, setName] = useState('')
  const [section, setSection] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [price, setPrice] = useState('')
  const [recipe, setRecipe] = useState('')
  const [dishes, setDishes] = useState<Dish[]>([])
  const [categories, setCategories] = useState<
    { _id: string; name: string; recipes: Dish[] }[]
  >([])

  useEffect(() => {
    fetch(`${url}/recipes/`)
      .then((res) => res.json())
      .then((data) => setDishes(data))

    fetch(`${url}/categories/`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
  }, [])
  return (
    <div>
      add category
      <form
        onSubmit={(e) => {
          e.preventDefault()
          fetch(`${url}/categories/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
          })
          setName('')
        }}
      >
        name:
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      <hr />
      dishes
      <form
        onSubmit={(e) => {
          e.preventDefault()
          // get data from checkboxes
          const categories: string[] = []
          const checkboxes = document.querySelectorAll('input[type="checkbox"]')
          checkboxes.forEach((checkbox) => {
            if ((checkbox as HTMLInputElement).checked) {
              categories.push((checkbox as HTMLInputElement).name)
            }
          })
          fetch(`${url}/recipes/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: recipe,
              categories,
              rating: 0,
              image: '',
            }),
          })
          e.currentTarget.reset()
          setRecipe('')
        }}
      >
        <div>
          name:
          <input
            name="name"
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
          />
        </div>
        <div>
          categories:
          {categories.map((category) => (
            <div>
              <label>{category.name}</label>
              <input key={category._id} type="checkbox" name={category._id} />
            </div>
          ))}
        </div>
        <button type="submit">add</button>
      </form>
      {dishes.map((dish) => (
        <div key={dish._id} style={{ display: 'flex', gap: '10px' }}>
          <Link to={`/admin/${dish._id}`}>{dish.name}</Link>
          <button
            onClick={() =>
              fetch(`${url}/recipes/${dish._id}`, { method: 'DELETE' })
            }
          >
            x
          </button>
        </div>
      ))}
      <hr />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          // get data from dish checkboxes
          const dishCheckboxes = document.querySelectorAll('input[data-dish]')
          const dishes: string[] = []
          dishCheckboxes.forEach((checkbox) => {
            if ((checkbox as HTMLInputElement).checked) {
              dishes.push((checkbox as HTMLInputElement).name)
            }
          })
          fetch(`${url}/sections/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: section,
              recipes: dishes,
            }),
          })
          setSection('')
          e.currentTarget.reset()
        }}
      >
        <div>
          name:{' '}
          <input
            name="name"
            type="text"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          />
        </div>
        <div>
          dishes:
          {dishes.map((dish) => (
            <div>
              <label>{dish.name}</label>
              <input data-dish key={dish._id} type="checkbox" name={dish._id} />
            </div>
          ))}
        </div>
        <button type="submit">add</button>
      </form>
      <hr />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          fetch(`${url}/ingredients/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: ingredient, price }),
          })
          setIngredient('')
          setPrice('')
        }}
      >
        <div>
          name:
          <input
            name="name"
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
        </div>
        <div>
          price:
          <input
            name="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}
