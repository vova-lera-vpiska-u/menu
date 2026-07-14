import styled from 'styled-components'

import { Clock } from '@shared/icons/Clock'
import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_2, TEXT_SIZE_5 } from '@shared/styles/fonts'

import { Rating } from '../rating'

export type DishCardVariant = 'short' | 'full' | 'wishlist'

type DishCardProps = {
    title: string
    image: string
    time?: string
    rating?: number
    ingredients?: string[]
    variant?: DishCardVariant
    onClick?: () => void
}

export const DishCard = ({
    title,
    image,
    time,
    rating,
    ingredients = [],
    variant = 'short',
    onClick,
}: DishCardProps) => {
    return (
        <Layout $image={image} onClick={onClick}>
            {variant === 'full' && ingredients.length > 0 && (
                <Ingredients>
                    ingredients
                    <Divider />
                    <IngredientsGrid $amount={ingredients.length}>
                        {ingredients.map((ingredient) => (
                            <span key={ingredient}>{ingredient}</span>
                        ))}
                    </IngredientsGrid>
                </Ingredients>
            )}
            <Info>
                <Title>{title}</Title>
                {variant !== 'wishlist' && time && (
                    <Time>
                        <Clock height="20" width="20" />
                        {time}
                    </Time>
                )}
            </Info>
            {variant !== 'wishlist' && rating !== undefined && <Rating rating={rating} />}
        </Layout>
    )
}

const Layout = styled.div<{ $image: string }>`
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    gap: 20px;
    width: 368px;
    max-width: 100%;
    min-height: 266px;
    max-height: 298px;
    padding: 15px 20px;
    box-sizing: border-box;
    border-radius: 7px;
    cursor: pointer;
    background:
        linear-gradient(90deg, rgba(0, 0, 0, 0.89) 15.86%, rgba(19, 13, 13, 0) 100%),
        url(${({ $image }) => $image}) center / cover no-repeat;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Title = styled.h3`
    margin: 0;
    max-width: 305px;
    text-align: start;
    color: ${COLORS.white};
    ${TEXT_SIZE_2};
`

const Time = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${COLORS.lightGray};
    ${TEXT_SIZE_5};
`

const Ingredients = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: ${COLORS.lightGray};
    ${TEXT_SIZE_5};
`

const Divider = styled.div`
    width: 67px;
    height: 1px;
    margin: 4px 0;
    background-color: ${COLORS.lightGray};
`

const IngredientsGrid = styled.div<{ $amount: number }>`
    display: grid;
    grid-template-rows: repeat(${({ $amount }) => ($amount > 5 ? 5 : $amount)}, 1fr);
    grid-auto-flow: column;
    column-gap: 20px;
    text-align: start;
`
