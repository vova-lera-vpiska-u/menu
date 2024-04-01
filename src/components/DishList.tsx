import styled from 'styled-components'
import { GoBackButton } from './GoBackButton'
import { DishCard } from './DishCard'
import { Filters } from './Filters'
import { useEffect, useMemo, useState } from 'react'
import { Category, Dish } from '../database/types'
import { Logo } from './Logo'

export const DishList = ({ title, menu }: { title: string; menu: Dish[] }) => {
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      // if scroll down hide the navbar
      setShow(false)
    } else {
      // if scroll up show the navbar
      setShow(true)
    }

    // remember current page location to use in the next move
    setLastScrollY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)

    // cleanup function
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY])
  const [filters, setFilters] = useState<Category[]>([])

  const filteredMenu = useMemo(() => {
    if (filters.length > 0) {
      return menu.filter((dish) =>
        dish.categories.some((category) => filters.includes(category))
      )
    }
    return menu
  }, [filters, menu])
  return (
    <Layout>
      <Flex>
        {filteredMenu.map((dish) => (
          <DishCard key={dish.name} dish={dish} />
        ))}
      </Flex>
      <Navbar hidden={!show}>
        <Logo />
        <GoBackButton to={'/'} />
        <Title>{title}</Title>
        <Filters
          filters={filters}
          setFilters={setFilters}
          filterList={[
            ...new Set(
              menu
                .map((dish) => dish.categories.map((category) => category))
                .flat()
            ),
          ]}
        />
      </Navbar>
    </Layout>
  )
}

const Layout = styled.div``

const Title = styled.h2`
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
  margin-top: 165px;
  padding-top: 10px;
  padding-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-direction: column;
`

const Navbar = styled.div<{ hidden: boolean }>`
  max-width: 100%;
  max-width: 1280px;
  padding: 1rem 1rem;
  padding-top: 0;
  text-align: center;
  background-color: #242424;
  display: block;
  position: fixed;
  top: ${(props) => (props.hidden ? '-100%' : '0')};
  left: 0;
  transition: top 0.3s;
`
