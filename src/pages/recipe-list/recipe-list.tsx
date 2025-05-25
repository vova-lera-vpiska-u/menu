import { useEffect, useMemo, useState } from 'react'

import { useGate, useUnit } from 'effector-react'
import styled from 'styled-components'

import { Filters } from '@widgets/Filters'
import { GoBackButton } from '@widgets/GoBackButton'
import { Logo } from '@widgets/Logo'
import { RecipeCard } from '@widgets/RecipeCard'

import { recipesModel } from '@entities/recipe'

import { HOMEPAGE_PATH } from '@shared/routes/shared-paths'
import { Center } from '@shared/ui/ui/Center'

import * as model from './model'

export const RecipeList = ({ title }: { title: string }) => {
    useGate(model.RecipesListGate, title)
    const menu = useUnit(recipesModel.$recipes)
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

    // TODO: make it cleaner
    useEffect(() => {
        window.addEventListener('scroll', controlNavbar)

        // cleanup function
        return () => {
            window.removeEventListener('scroll', controlNavbar)
        }
    }, [lastScrollY])
    const [filters, setFilters] = useState<string[]>([])

    const filteredMenu = useMemo(() => {
        if (!menu) return []
        if (filters.length > 0) {
            return menu.filter((recipe) => recipe.categories.some((category) => filters.includes(category.name)))
        }
        return menu
    }, [filters, menu])

    return (
        <Layout>
            {filteredMenu.length > 0 ? (
                <>
                    <Flex>
                        {filteredMenu.map((recipe) => (
                            <RecipeCard key={recipe.name} recipe={recipe} title={title} />
                        ))}
                    </Flex>
                    <Navbar hidden={!show}>
                        <Logo />
                        <GoBackButton to={HOMEPAGE_PATH} />
                        <Title>{title}</Title>
                        <Filters
                            filters={filters}
                            setFilters={setFilters}
                            filterList={[
                                ...new Set(
                                    (menu || [])
                                        .map((recipe) => recipe.categories.map((category) => category.name))
                                        .flat(),
                                ),
                            ]}
                        />
                    </Navbar>
                </>
            ) : (
                <Center>Loading</Center>
            )}
        </Layout>
    )
}

const Layout = styled.div`
    min-height: 100vh;
    max-width: 500px;
`

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
    max-width: 500px;

    padding: 1rem 1rem;
    padding-top: 0;
    text-align: center;
    background-color: #242424;
    display: block;
    position: fixed;
    top: ${(props) => (props.hidden ? '-100%' : '0')};
    transition: top 0.3s;
`
