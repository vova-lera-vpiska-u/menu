import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Logo } from '@components/Logo'
import { useUnit } from 'effector-react'
import { userModel } from '../entities/user/model'
import { ADMIN_PATH } from '../routes/private/paths'
import Earth from '@assets/img/Earth.png'
import Air from '@assets/img/Air.png'
import Ethanol from '@assets/img/Ethanol.png'
import HSL from '@assets/img/HLS.png'
import Dessert from '@assets/img/5 element.png'
import Fire from '@assets/img/Fire.png'
import { TEXT_SIZE_1, TEXT_SIZE_3_REGULAR } from '../styles/fonts'
import { COLORS } from '../styles/colors'

export const Main = () => {
  const [user] = useUnit([userModel.stores.user])
  return (
    <>
      <Logo />
      {user && <AdminPageLink to={ADMIN_PATH}>Add Recipe</AdminPageLink>}
      <Layout>
        <Element imageURL={Fire} to={'/fire'}>
          FIRE
        </Element>
        <Element imageURL={Air} to={'/air'}>
          AIR
        </Element>
        <Element imageURL={Earth} to={'/earth'}>
          EARTH
        </Element>
        <Element imageURL={Dessert} to={'/desserts'}>
          DESSERTS
        </Element>
        <Element imageURL={Ethanol} to={'/water'}>
          ETHANOL
        </Element>
        <Element imageURL={HSL} to={'/water'}>
          HSL
        </Element>
        <Carousel
          imageURL="https://avatars.dzeninfra.ru/get-zen_doc/3401641/pub_5f6c490fd2daf865cca18014_5f6c4933d2daf865cca1bbda/scale_1200"
          to={'/all'}
        >
          ALL
        </Carousel>
      </Layout>
    </>
  )
}
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
  ${COLORS.lightGray}

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
      ${COLORS.white}
      background-color: rgba(0, 0, 0, 0.4);
      background-blend-mode: darken;
    }
  }
`

const Carousel = styled(Link)<{ imageURL: string }>`
  ${TEXT_SIZE_1}
  ${COLORS.lightGray}  

  grid-column: span 2;
  aspect-ratio: 2 / 1;
  display: grid;
  place-content: center;
  border: 1px dashed white;
  border-radius: 7px;
  background: url(${({ imageURL }) => imageURL});
  background-position: center;
  background-size: cover;
`
