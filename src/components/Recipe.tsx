import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { GoBackButton } from './GoBackButton'
import { useEffect } from 'react'
import {
  $recipe,
  recipePageMounted,
  recipePageUnMounted,
} from './admin/item/model'
import { useUnit } from 'effector-react'

export const Recipe = () => {
  const recipe = useUnit($recipe)
  const { id, title } = useParams<{ id: string; title: string }>()

  useEffect(() => {
    if (id) recipePageMounted(id)
    return () => recipePageUnMounted()
  }, [])

  if (!recipe || !id) return null

  return (
    <div>
      <Nav>
        <GoBackButton to={`/${title}`} />
        <Title>{title}</Title>
      </Nav>
      <div>
        <img src={recipe?.image} />
        <div>
          <h2>{recipe.name}</h2>
          <h3>{recipe.description}</h3>
          <h3>{recipe.rating}</h3>
          <h4>{recipe.recipe}</h4>
        </div>
      </div>
    </div>
  )
}

const Nav = styled.div`
  height: calc(26px + 4rem);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.h2`
  font-family: 'Enthalpy 298';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  color: #ffffff;
`
