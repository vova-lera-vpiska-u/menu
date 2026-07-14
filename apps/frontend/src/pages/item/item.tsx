import { useParams } from 'react-router-dom'

import { useGate, useUnit } from 'effector-react'
import styled from 'styled-components'

import { GoBackButton } from '@widgets/GoBackButton'
import { RecipeForm } from '@widgets/RecipeForm'

import { recipesModel } from '@entities/recipe'

export const Item = () => {
    const { id } = useParams<{ id: string }>()
    useGate(recipesModel.RecipePageGate, id)

    const recipe = useUnit(recipesModel.$recipe)

    if (!recipe || !id) return null

    return (
        <div>
            <Nav>
                <GoBackButton />
                <Title>EDIT</Title>
            </Nav>
            <RecipeForm mode="edit" recipe={recipe} />
        </div>
    )
}

const Nav = styled.div`
    position: relative;
    height: calc(26px + 4rem);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-inline: 1rem;
`

const Title = styled.h2`
    font-family: 'Enthalpy 298';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    color: #ffffff;
`
