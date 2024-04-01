import styled from 'styled-components'
import { GoBackButton } from './GoBackButton'
import { menu } from '../database/bd'
import { DishCard } from './DishCard'
import { Filters } from './Filters'

export const DishList = ({ title }: { title: string }) => {
  return (
    <Layout>
      <GoBackButton to={'/'} />
      <Title>{title}</Title>
      <Filters />
      <Flex>
        {menu.map((dish) => (
          <DishCard key={dish.name} dish={dish} />
        ))}
      </Flex>
    </Layout>
  )
}

const Layout = styled.div``

const Title = styled.h2`
  width: 73px;
  height: 20px;
  margin: 0;
  padding-bottom: 8px;
  text-align: start;

  font-family: 'Enthalpy 298';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  color: #ffffff;
`

const Flex = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-direction: column;
`
