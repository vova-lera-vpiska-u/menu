import { useEffect, useState } from 'react'
import { url } from '../../api/consts'
import { Dish } from '../../api/types'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useUnit } from 'effector-react'
import { userModel } from '../../entities/user/model'
import { colors } from '../../styles/colors'
import { text_h3_light } from '../../styles/fonts'
import { FieldBig } from '../FieldBig'
import { DropdownMenu } from '../DropdownMenu'
import { ToggleButtonSmall } from '../../components/shared/ToggleButtonSmall'
import { Star } from '../../icons/Star'
import { FieldSmall } from '../FieldSmall'
import { Clock } from '../../icons/Clock'

export const Admin = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [section, setSection] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [price, setPrice] = useState('')
  const [recipe, setRecipe] = useState('')
  const [dishes, setDishes] = useState<Dish[]>([])
  const [categories, setCategories] = useState<
    { _id: string; name: string; recipes: Dish[] }[]
  >([])
  const [menu, setMenu] = useState<Dish[]>([])

  const [logout] = useUnit([userModel.events.logout])
  const [filters, setFilters] = useState<string[]>([])
  const timesUnit = ['h', 'min']
  const menuChapters = ['Fire', 'Air', 'Eath', '5 Element', 'HLS', 'Ethanol']

  useEffect(() => {
    fetch(`${url}/recipes/`)
      .then((res) => res.json())
      .then((data) => setDishes(data))

    fetch(`${url}/categories/`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
        console.log('categories', categories)
      })
  }, [])

  useEffect(() => {
    fetch(`${url}/recipes/`)
      .then((res) => res.json())
      .then((data) => setMenu(data))
  }, [])

  return (
    <div>
      <Button
        onClick={() => {
          logout()
          navigate('/', { replace: true })
        }}
      >
        Logout
      </Button>
      {/* <Header title="adding a recipe" /> */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          fetch(`${url}/categories/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ name }),
          })
          setName('')
        }}
      ></form>
      {/* <Navbar hidden={!show}>
        <Logo />
        <GoBackButton to={'/'} />
        <Title>{title}</Title>
        <Filters
          filters={filters}
          setFilters={setFilters}
          filterList={[
            ...new Set(
              menu
                .map((dish) => dish.categories.map((category) => category.name))
                .flat()
            ),
          ]}
        />
      </Navbar> */}
      <Layout>
        <SettingLayout columnStart={1} columnEnd={3}>
          <Name>Name</Name>
          <FieldBig name="" placeholder="" type=""></FieldBig>
        </SettingLayout>
        <SettingLayout columnStart={1} columnEnd={2}>
          <Name>Category</Name>
          <DropdownMenu optionsArray={menuChapters}></DropdownMenu>
        </SettingLayout>
        <SettingLayout columnStart={1} columnEnd={3}>
          <Name>Tags</Name>
          <TagsWrapper>
            {categories.map((category) => {
              return (
                <ToggleButtonSmall<string>
                  key={category._id}
                  label={category.name}
                  labels={filters}
                  setLabels={(labels) => {
                    setFilters(labels)
                  }}
                />
              )
            })}
          </TagsWrapper>
        </SettingLayout>
        <SettingLayout columnStart={1} columnEnd={2}>
          <Name>Rate</Name>
          <RateWrapper>
            <FieldSmall
              placeholder=""
              type="search"
              name=""
              iconVisible={false}
              iconHeight="24"
              iconWidth="24"
            ></FieldSmall>
            <Star height="24" width="24" />
          </RateWrapper>
        </SettingLayout>
        <SettingLayout columnStart={1} columnEnd={2}>
          <Name>Time</Name>
          <TimeWrapper>
            <FieldSmall
              placeholder=""
              type="search"
              name=""
              iconVisible={false}
              iconHeight="24"
              iconWidth="24"
            ></FieldSmall>
            <DropdownMenu optionsArray={timesUnit}></DropdownMenu>
            <Clock height="24" width="24" />
          </TimeWrapper>
        </SettingLayout>
      </Layout>
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
            credentials: 'include',
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
        <button type="submit">add</button>
      </form>
      {dishes.map((dish) => (
        <div key={dish._id} style={{ display: 'flex', gap: '10px' }}>
          <Link to={`/admin/${dish._id}`}>{dish.name}</Link>
          <button
            onClick={() =>
              fetch(`${url}/recipes/${dish._id}`, {
                credentials: 'include',
                method: 'DELETE',
              })
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
            credentials: 'include',
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

            credentials: 'include',
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
const TimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;

  width: 100%;

  flex: none;
  order: 1;
  flex-grow: 0;
`
const RateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;

  width: 100%;

  flex: none;
  order: 1;
  flex-grow: 0;
`
const TagsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  padding: 0px;
  gap: 4px;

  width: 100%;

  flex: none;
  order: 1;
  flex-grow: 0;
`
const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
  row-gap: 32px;

  min-height: 0; /* NEW */
  min-width: 0;
`
const Button = styled.button`
  position: absolute;
  top: 16px;
  right: 32px;
`
const SettingLayout = styled.div<{ columnStart: number; columnEnd: number }>`
  position: relative;
  display: flex;
  flex: 1 1 0px;
  flex-direction: column;
  align-items: start;
  grid-column: ${({ columnStart }) => columnStart} /
    ${({ columnEnd }) => columnEnd};
  gap: 8px;

  overflow: hidden; /* NEW */
  min-width: 0;
`
const Name = styled.div`
  color: ${colors.white} ${text_h3_light};
`
