import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

import { Recipe } from '@shared/api/types'
import { Clock } from '@shared/icons/Clock'
import { Star } from '@shared/icons/Star'

export const RecipeCard = ({ recipe, title }: { recipe: Recipe; title: string }) => {
    const navigate = useNavigate()
    return (
        <Layout
            imgurl={recipe.image || ''}
            onClick={() => {
                navigate(`/${title}/${recipe._id}`)
            }}
        >
            {recipe.ingredients && (
                <Ingredients>
                    ingredients
                    <Divider />
                    <IngredientsGrid amount={recipe.ingredients.length}>
                        {recipe.ingredients.map((ingredient) => (
                            <div key={ingredient.ingredient.name}>{ingredient.ingredient.name}</div>
                        ))}
                    </IngredientsGrid>
                </Ingredients>
            )}
            <Flex direction="column">
                <Title>{recipe.name}</Title>
                <Time>
                    {recipe.timeToCook && (
                        <>
                            <Clock height="20" width="20" />
                            {recipe.timeToCook}
                        </>
                    )}
                </Time>
            </Flex>
            <Rating>
                <Star height="14" width="14" />
                {recipe.rating}
            </Rating>
        </Layout>
    )
}

const Layout = styled.div<{ imgurl: string }>`
    position: relative;
    display: flex;
    padding: 15px 20px;
    flex-direction: column-reverse;
    gap: 20px;

    min-height: 266px;
    max-height: 298px;
    box-sizing: border-box;

    background:
        linear-gradient(90deg, rgba(0, 0, 0, 0.89) 15.86%, rgba(19, 13, 13, 0) 100%, rgba(0, 0, 0, 0) 100.01%),
        url(${(props) => props.imgurl}) center / cover no-repeat;
    border-radius: 7px;
`

const Title = styled.h3`
    max-width: 305px;
    text-align: start;
    margin: 0;
    font-family: 'Enthalpy 298';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 32px;
    color: #ffffff;
`

const Time = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`

const Rating = styled.div`
    position: absolute;
    top: 15px;
    right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Alumni Sans', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #d8d8d8;
`
const Ingredients = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const Divider = styled.div`
    width: 67px;
    height: 1px;
    background-color: #d8d8d8;
`

const Flex = styled.div<{ direction?: string }>`
    display: flex;
    gap: 10px;
    flex-direction: ${(props) => props.direction || 'row'};
    justify-content: space-between;
`

const IngredientsGrid = styled.div<{ amount: number }>`
    display: grid;
    grid-template-rows: repeat(${(props) => (props.amount > 5 ? 5 : props.amount)}, 1fr);
    grid-auto-flow: column;
    column-gap: 20px;
    text-align: start;
`
