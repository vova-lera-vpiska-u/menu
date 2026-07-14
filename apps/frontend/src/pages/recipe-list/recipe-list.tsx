import { useMemo, useState } from 'react'

import { useGate, useUnit } from 'effector-react'
import styled from 'styled-components'

import { Filters } from '@widgets/Filters'
import { GoBackButton } from '@widgets/GoBackButton'
import { RecipeCard } from '@widgets/RecipeCard'

import { recipesModel } from '@entities/recipe'

import { CONTAINER_WIDTH, media } from '@shared/styles/breakpoints'
import { Center } from '@shared/ui/ui/Center'

import * as model from './model'
import { useHideNavbarOnScroll } from './use-hide-navbar-on-scroll'

export const RecipeList = ({ title }: { title: string }) => {
    useGate(model.RecipesListGate, title)
    const [menu, sectionPending, allPending] = useUnit([
        recipesModel.$recipes,
        recipesModel.getSectionRecipesFx.pending,
        recipesModel.getRecipesFx.pending,
    ])
    const visible = useHideNavbarOnScroll()
    const [filter, setFilter] = useState<string | null>(null)

    // `menu === null` means the first load hasn't resolved yet; an empty array
    // means the category resolved but simply has no recipes.
    const isLoading = sectionPending || allPending || menu === null

    const filteredMenu = useMemo(() => {
        if (!menu) return []
        if (filter) {
            return menu.filter((recipe) => recipe.tags.some((category) => category.tag?.name === filter))
        }
        return menu
    }, [filter, menu])

    const filterList = useMemo(() => {
        const names = (menu ?? [])
            .flatMap((recipe) => recipe.tags.map((category) => category.tag?.name))
            .filter((name): name is string => Boolean(name))
        return [...new Set(names)]
    }, [menu])

    return (
        <Layout>
            <Flex>
                {isLoading ? (
                    <Center>Loading</Center>
                ) : filteredMenu.length > 0 ? (
                    filteredMenu.map((recipe) => <RecipeCard key={recipe.name} recipe={recipe} />)
                ) : (
                    <Empty>В этой категории пока нет рецептов</Empty>
                )}
            </Flex>
            <Navbar $hidden={!visible}>
                <Header>
                    <GoBackButton />
                    <Title>{title}</Title>
                </Header>
                {!isLoading && filterList.length > 0 && (
                    <Filters selected={filter} setSelected={setFilter} filterList={filterList} />
                )}
            </Navbar>
        </Layout>
    )
}

const Layout = styled.div`
    min-height: 100vh;
    width: 100%;
    max-width: 100%;
`

const Header = styled.div`
    position: relative;
    height: 3.625rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Empty = styled.div`
    padding-top: 2rem;
    text-align: center;
    color: #d8d8d8;
`

const Title = styled.h2`
    margin: 0;
    text-align: center;

    font-family: 'Enthalpy 298';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    color: #ffffff;
`

const Flex = styled.div`
    margin-top: 126px;
    padding-top: 10px;
    padding-bottom: 20px;
    display: flex;
    gap: 10px;
    flex-direction: column;

    ${media.tablet} {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 1rem;
    }
`

const Navbar = styled.div<{ $hidden: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;

    width: 100%;
    max-width: 500px;
    margin-inline: auto;

    padding: 0 1rem 1rem;
    text-align: center;
    background-color: #242424;

    transform: translateY(${(props) => (props.$hidden ? '-100%' : '0')});
    opacity: ${(props) => (props.$hidden ? 0 : 1)};
    transition:
        transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
        opacity 0.25s ease;
    will-change: transform, opacity;

    ${media.tablet} {
        max-width: ${CONTAINER_WIDTH};
        padding-inline: clamp(1rem, 4vw, 2.5rem);
    }
`
