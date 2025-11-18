import { useLayoutEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { useGate, useUnit } from 'effector-react'
import styled from 'styled-components'

import { GoBackButton } from '@widgets/GoBackButton'

import { recipesModel } from '@entities/recipe'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_2, TEXT_SIZE_3_REGULAR } from '@shared/styles/fonts'
import { Group } from '@shared/ui/group'
import { Image } from '@shared/ui/image'
import { Rating } from '@shared/ui/rating'

export const Recipe = () => {
    const { id } = useParams<{ id: string }>()
    useGate(recipesModel.RecipePageGate, id)

    const headerRef = useRef<HTMLDivElement>(null)
    const plateRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const header = headerRef.current
        const plate = plateRef.current

        if (header && plate) {
            const headerHeight = header.offsetHeight
            plate.style.marginTop = `${-headerHeight - 30}px`
        }
    })

    const [recipe, categories] = useUnit([recipesModel.$recipe, recipesModel.$categories])

    if (!recipe || !id || !categories) return null

    return (
        <div>
            <Nav>
                <GoBackButton fallback={recipe.category.name} />
                <Title>{recipe.category.name}</Title>
            </Nav>
            {recipe.cover_url && <Image src={recipe.cover_url} />}
            <DataPlate ref={plateRef}>
                <div>
                    <Group gap={10}>
                        <RecipeName ref={headerRef}>{recipe.name}</RecipeName>
                        {recipe.rating && <Rating rating={recipe.rating} />}
                    </Group>
                    <Group gap={0} mt={30}>
                        {recipe.tags.map((category) => (
                            <CategoryTag key={category.tag?.id}>
                                #{categories.find((c) => c.id === category.tag?.id)?.name}
                            </CategoryTag>
                        ))}
                    </Group>
                    <p>{recipe.recipe}</p>
                </div>
            </DataPlate>
        </div>
    )
}

const Nav = styled.div`
    position: relative;
    height: 3.625rem;
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

const RecipeName = styled.h2`
    ${TEXT_SIZE_2}
    color: ${COLORS.white};
    text-align: start;
    margin: 0;
`

const DataPlate = styled.article`
    margin-inline: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 10px;
    gap: 30px;

    background: rgba(71, 71, 71, 0.4);
    backdrop-filter: blur(6.85px);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 7px;
`

const CategoryTag = styled.span`
    padding: 6px 10px 5px;
    text-transform: capitalize;

    ${TEXT_SIZE_3_REGULAR}
    color: #8FA847;
`
