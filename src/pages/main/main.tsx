import { Link, useNavigate } from 'react-router-dom'

import { useGate, useUnit } from 'effector-react'
import styled from 'styled-components'

import { Logo } from '@widgets/Logo'
import { RecipeCard } from '@widgets/RecipeCard'

import { searchModel } from '@features/search'

import { userModel } from '@entities/user/model'

import Dessert from '@shared/assets/img/5 element.png'
import Air from '@shared/assets/img/Air.png'
import Earth from '@shared/assets/img/Earth.png'
import Ethanol from '@shared/assets/img/Ethanol.png'
import Fire from '@shared/assets/img/Fire.png'
import HSL from '@shared/assets/img/HLS.png'
import { ADMIN_PATH } from '@shared/routes/private-paths'
import { AIR_PATH, DESSERTS_PATH, EARTH_PATH, FIRE_PATH, WATER_PATH } from '@shared/routes/shared-paths'
import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_1, TEXT_SIZE_2, TEXT_SIZE_3_LIGHT, TEXT_SIZE_3_REGULAR } from '@shared/styles/fonts'

import * as model from './model'
import { useCarousel } from './use-carousel'

const FEATURED_LIMIT = 6

export const Main = () => {
    useGate(model.MainPageGate)
    const navigate = useNavigate()

    const [user] = useUnit([userModel.stores.user])
    const [searchResults] = useUnit([searchModel.$recipes])
    const [featured] = useUnit([model.$featured])

    const slides = (featured || []).slice(0, FEATURED_LIMIT)
    const { containerRef, activeIndex, scrollToIndex } = useCarousel(slides.length)

    if (searchResults) {
        return (
            <>
                <Logo />
                <Stack>
                    {searchResults.map((recipe) => (
                        <RecipeCard key={recipe.name} recipe={recipe} />
                    ))}
                </Stack>
            </>
        )
    }

    return (
        <>
            <Logo />
            {user && <AdminPageLink to={ADMIN_PATH}>Add Recipe</AdminPageLink>}

            <Grid>
                <Element imageURL={Fire} to={FIRE_PATH}>
                    FIRE
                </Element>
                <Element imageURL={Air} to={AIR_PATH}>
                    AIR
                </Element>
                <Element imageURL={Earth} to={EARTH_PATH}>
                    EARTH
                </Element>
                <Element imageURL={Dessert} to={DESSERTS_PATH}>
                    5 ELEMENT
                </Element>
                <Element imageURL={Ethanol} to={WATER_PATH}>
                    ETHANOL
                </Element>
                <Element imageURL={HSL} to={WATER_PATH}>
                    HLS
                </Element>
            </Grid>

            {slides.length > 0 && (
                <Section>
                    <SectionTitle>What about..</SectionTitle>
                    <Carousel ref={containerRef}>
                        {slides.map((recipe) => (
                            <Slide
                                key={recipe.id}
                                imageURL={recipe.cover_url || ''}
                                onClick={() => navigate(`/recipes/${recipe.id}`)}
                            >
                                <SlideTitle>{recipe.name}</SlideTitle>
                            </Slide>
                        ))}
                    </Carousel>
                    <Dots>
                        {slides.map((recipe, index) => (
                            <Dot
                                key={recipe.id}
                                $active={index === activeIndex}
                                onClick={() => scrollToIndex(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </Dots>
                </Section>
            )}
        </>
    )
}

const Stack = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

const AdminPageLink = styled(Link)`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 1rem;
    max-height: 41px;
    min-width: 29px;
    width: 100%;
    padding: 6px 0;
    box-sizing: border-box;
    background-color: ${COLORS.oliveGreen};
    border-radius: 3px;

    ${TEXT_SIZE_3_REGULAR}
    color: ${COLORS.white};

    transition: background-color 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: ${COLORS.oliveGreenHover};
        }
    }
`

const Grid = styled.div`
    padding-top: 1rem;
    display: grid;
    width: 100%;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
`

const Element = styled(Link)<{ imageURL: string }>`
    ${TEXT_SIZE_1}
    color: ${COLORS.lightGray};

    display: grid;
    place-content: center;
    aspect-ratio: 1;
    border: 1px solid white;
    border-radius: 7px;
    background: url(${({ imageURL }) => imageURL});
    background-position: center;
    background-size: cover;

    transition:
        color 0.25s ease,
        transform 0.25s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            color: ${COLORS.white};
            transform: scale(1.02);
            background-color: rgba(0, 0, 0, 0.4);
            background-blend-mode: darken;
        }
    }
`

const Section = styled.section`
    margin-top: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const SectionTitle = styled.h2`
    margin: 0;
    text-align: start;
    color: ${COLORS.lightGray};
    ${TEXT_SIZE_3_LIGHT}
`

const Carousel = styled.div`
    display: flex;
    width: 100%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    border-radius: 7px;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`

const Slide = styled.div<{ imageURL: string }>`
    position: relative;
    display: flex;
    align-items: flex-end;
    flex: 0 0 100%;
    scroll-snap-align: center;
    aspect-ratio: 4 / 3;
    padding: 20px;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 7px;

    background:
        linear-gradient(0deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0) 55%),
        url(${({ imageURL }) => imageURL}) center / cover no-repeat;
`

const SlideTitle = styled.h3`
    margin: 0;
    max-width: 90%;
    text-align: start;
    text-transform: uppercase;
    color: ${COLORS.white};
    ${TEXT_SIZE_2}
`

const Dots = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
`

const Dot = styled.button<{ $active: boolean }>`
    height: 8px;
    width: ${({ $active }) => ($active ? '22px' : '8px')};
    padding: 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: ${({ $active }) => ($active ? COLORS.oliveGreen : COLORS.lightGray)};
    opacity: ${({ $active }) => ($active ? 1 : 0.5)};

    transition:
        width 0.3s ease,
        background-color 0.3s ease,
        opacity 0.3s ease;
`
