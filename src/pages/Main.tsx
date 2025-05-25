import { Link } from 'react-router-dom'

import { useUnit } from 'effector-react'
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
import {
    AIR_PATH,
    ALL_RECIPES_PATH,
    DESSERTS_PATH,
    EARTH_PATH,
    FIRE_PATH,
    WATER_PATH,
} from '@shared/routes/shared-paths'
import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_1, TEXT_SIZE_3_REGULAR } from '@shared/styles/fonts'

export const Main = () => {
    const [user] = useUnit([userModel.stores.user])
    const [recipes] = useUnit([searchModel.$recipes])
    return (
        <>
            <Logo />
            {recipes ? (
                <Stack>
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.name} recipe={recipe} title="FOUND RECIPES" />
                    ))}
                </Stack>
            ) : (
                <>
                    {user && <AdminPageLink to={ADMIN_PATH}>Add Recipe</AdminPageLink>}
                    <Layout>
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
                            DESSERTS
                        </Element>
                        <Element imageURL={Ethanol} to={WATER_PATH}>
                            ETHANOL
                        </Element>
                        <Element imageURL={HSL} to={WATER_PATH}>
                            HSL
                        </Element>
                        <Carousel
                            imageURL="https://avatars.dzeninfra.ru/get-zen_doc/3401641/pub_5f6c490fd2daf865cca18014_5f6c4933d2daf865cca1bbda/scale_1200"
                            to={ALL_RECIPES_PATH}
                        >
                            ALL
                        </Carousel>
                    </Layout>
                </>
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
`

const Layout = styled.div`
    padding-top: 1rem;
    display: grid;
    width: 100%;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
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

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            color: ${COLORS.white};
            background-color: rgba(0, 0, 0, 0.4);
            background-blend-mode: darken;
        }
    }
`

const Carousel = styled(Link)<{ imageURL: string }>`
    ${TEXT_SIZE_1}
    color:${COLORS.lightGray};

    grid-column: span 2;
    aspect-ratio: 2 / 1;
    display: grid;
    place-content: center;
    border: 1px dashed white;
    border-radius: 7px;
    background: url(${({ imageURL }) => imageURL});
    background-position: center;
    background-size: cover;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            color: ${COLORS.white};
            background-color: rgba(0, 0, 0, 0.4);
            background-blend-mode: darken;
        }
    }
`
