import { Fragment, RefObject, useLayoutEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useGate, useUnit } from 'effector-react'
import styled from 'styled-components'

import { GoBackButton } from '@widgets/GoBackButton'

import { recipesModel } from '@entities/recipe'
import { userModel } from '@entities/user/model'

import { Edit } from '@shared/icons/Edit'
import { ADMIN_PATH } from '@shared/routes/private-paths'
import { media } from '@shared/styles/breakpoints'
import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_2, TEXT_SIZE_3_REGULAR, TEXT_SIZE_4 } from '@shared/styles/fonts'
import { Group } from '@shared/ui/group'
import { Image } from '@shared/ui/image'
import { Rating } from '@shared/ui/rating'

// Pulls the data plate up so it overlaps the cover image by the header's height.
const usePlateOverlap = (headerRef: RefObject<HTMLDivElement>, plateRef: RefObject<HTMLDivElement>) => {
    useLayoutEffect(() => {
        const header = headerRef.current
        const plate = plateRef.current

        if (header && plate) {
            const headerHeight = header.offsetHeight
            plate.style.marginTop = `${-headerHeight - 30}px`
        }
    })
}

export const Recipe = () => {
    const { id } = useParams<{ id: string }>()
    useGate(recipesModel.RecipePageGate, id)

    const headerRef = useRef<HTMLDivElement>(null)
    const plateRef = useRef<HTMLDivElement>(null)

    usePlateOverlap(headerRef, plateRef)

    const [recipe, categories, user] = useUnit([
        recipesModel.$recipe,
        recipesModel.$categories,
        userModel.stores.user,
    ])

    if (!recipe || !id || !categories) return null

    return (
        <Page>
            <Nav>
                <GoBackButton fallback={recipe.category.name} />
                <Title>{recipe.category.name}</Title>
                {user && (
                    <EditLink to={`${ADMIN_PATH}/${id}`} aria-label="Edit recipe">
                        <Edit />
                    </EditLink>
                )}
            </Nav>
            {recipe.cover_url && <Image src={recipe.cover_url} />}
            <DataPlate ref={plateRef}>
                <Group gap={10}>
                    <RecipeName ref={headerRef}>{recipe.name}</RecipeName>
                    {recipe.rating && <Rating rating={recipe.rating} />}
                </Group>
                <Tags>
                    {recipe.tags.map((category) => (
                        <CategoryTag key={category.tag?.id}>
                            #{categories.find((c) => c.id === category.tag?.id)?.name}
                        </CategoryTag>
                    ))}
                </Tags>
                {recipe.ingredients && recipe.ingredients.length > 0 && (
                    <Section>
                        <SectionLabel>Ingredients</SectionLabel>
                        <IngredientsGrid>
                            {recipe.ingredients.map(({ ingredient, amount, unit, optional }) => (
                                <Fragment key={ingredient?.name}>
                                    <IngredientName>
                                        {ingredient?.name}
                                        {optional && <Optional>*</Optional>}
                                    </IngredientName>
                                    <IngredientAmount>{formatAmount(amount, unit)}</IngredientAmount>
                                </Fragment>
                            ))}
                        </IngredientsGrid>
                    </Section>
                )}
                {recipe.recipe && (
                    <Section>
                        <SectionLabel>Recipe</SectionLabel>
                        <RecipeText>{recipe.recipe}</RecipeText>
                    </Section>
                )}
                <NutritionTable>
                    <NutritionCell>
                        <NutritionName>Calories</NutritionName>
                        <NutritionValue>{recipe.calories ?? '—'}</NutritionValue>
                    </NutritionCell>
                    <NutritionCell>
                        <NutritionName>Proteins</NutritionName>
                        <NutritionValue>{recipe.protein ?? '—'}</NutritionValue>
                    </NutritionCell>
                    <NutritionCell>
                        <NutritionName>Fats</NutritionName>
                        <NutritionValue>{recipe.fat ?? '—'}</NutritionValue>
                    </NutritionCell>
                    <NutritionCell>
                        <NutritionName>Carbohydrates</NutritionName>
                        <NutritionValue>{recipe.carbs ?? '—'}</NutritionValue>
                    </NutritionCell>
                </NutritionTable>
            </DataPlate>
        </Page>
    )
}

const Page = styled.div`
    ${media.tablet} {
        max-width: 760px;
        margin-inline: auto;
    }
`

const Nav = styled.div`
    position: relative;
    height: 3.625rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-inline: 1rem;
`

const EditLink = styled(Link)`
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.625rem;
    transition:
        opacity 0.2s ease,
        transform 0.2s ease;

    &:hover {
        opacity: 0.7;
    }

    &:active {
        transform: scale(0.92);
    }
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

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const CategoryTag = styled.span`
    padding: 6px 10px 5px;
    text-transform: capitalize;

    ${TEXT_SIZE_3_REGULAR}
    color: #8FA847;
`

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
`

const SectionLabel = styled.h3`
    ${TEXT_SIZE_4}
    margin: 0;
    padding-bottom: 4px;
    color: ${COLORS.lightGray};
    border-bottom: 1px solid ${COLORS.lightGray};
`

const IngredientsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: baseline;
    column-gap: 20px;
    width: 100%;
`

const IngredientName = styled.p`
    ${TEXT_SIZE_3_REGULAR}
    font-size: 28px;
    line-height: 1.2;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 2px;
    text-align: start;
    color: ${COLORS.white};
`

const Optional = styled.span`
    color: ${COLORS.white};
`

const IngredientAmount = styled.p`
    ${TEXT_SIZE_3_REGULAR}
    font-size: 28px;
    line-height: 1.2;
    margin: 0;
    text-align: end;
    color: ${COLORS.white};
`

const RecipeText = styled.p`
    ${TEXT_SIZE_4}
    margin: 0;
    width: 100%;
    text-align: start;
    white-space: pre-line;
    color: ${COLORS.white};
`

const NutritionTable = styled.div`
    display: flex;
    width: 100%;
    border: 1px solid ${COLORS.lightGray};
`

const NutritionCell = styled.div`
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    & + & {
        border-left: 1px solid ${COLORS.lightGray};
    }
`

const NutritionName = styled.span`
    ${TEXT_SIZE_4}
    margin: 0;
    padding: 6px 0;
    width: 100%;
    text-align: center;
    color: ${COLORS.white};
    border-bottom: 1px solid ${COLORS.lightGray};
`

const NutritionValue = styled.span`
    ${TEXT_SIZE_4}
    margin: 0;
    padding: 6px 0;
    text-align: center;
    color: ${COLORS.white};
`

const formatAmount = (amount: number | null, unit: string | null) => {
    if (amount === null && !unit) return ''
    if (amount === null) return unit
    return unit ? `${amount} ${unit}` : `${amount}`
}
