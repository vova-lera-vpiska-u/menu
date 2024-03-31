import styled from 'styled-components'
import { Dish } from '../database/types'
import { Star } from '../icons/Star'
import { Clock } from '../icons/Clock'

export const DishCard = ({ dish }: { dish: Dish }) => {
  return (
    <Layout imgUrl={dish.image}>
      <Ingridients>
        Ingridients
        <Divider />
        <IngridientsGrid>
          {dish.ingredients.map((ingridient) => (
            <div>{ingridient.ingridient.name}</div>
          ))}
        </IngridientsGrid>
      </Ingridients>
      <Flex direction="column">
        <Title>{dish.name}</Title>
        <Time>
          <Clock />
          {dish.timeToCook}
        </Time>
      </Flex>
      <Rating>
        <Star />
        {dish.rating}
      </Rating>
    </Layout>
  )
}

const Layout = styled.div<{ imgUrl: string }>`
  position: relative;
  display: flex;
  padding: 15px 20px;
  flex-direction: column-reverse;
  gap: 20px;

  min-height: 298px;

  background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.89) 15.86%,
      rgba(19, 13, 13, 0) 100%,
      rgba(0, 0, 0, 0) 100.01%
    ),
    url(${(props) => props.imgUrl}) center / cover no-repeat;
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
const Ingridients = styled.div`
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

const IngridientsGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-auto-flow: column;
  column-gap: 20px;
  text-align: start;
`
