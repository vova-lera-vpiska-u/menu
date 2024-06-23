import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Logo } from '../components/Logo'
import { LOGIN_PATH } from '../routes/public/paths'
import { useUnit } from 'effector-react'
import { userModel } from '../entities/user/model'
import { ADMIN_PATH } from '../routes/private/paths'
import Earth from '../../public/img/Earth.png'
import Air from '../../public/img/Air.png'
import Ethanol from '../../public/img/Ethanol.png'
import HSL from '../../public/img/HLS.png'
import Dessert from '../../public/img/5 element.png'
import Fire from '../../public/img/Fire.png'
import { text_h1 } from '../styles/fonts'
import { colors } from '../styles/colors'

export const Main = () => {
  const [user] = useUnit([userModel.stores.user])
  return (
    <>
      <Logo />
      {user ? (
        <Login to={ADMIN_PATH}>AD</Login>
      ) : (
        <Login to={LOGIN_PATH}>LOGIN</Login>
      )}
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
const Login = styled(Link)`
  position: absolute;
  top: 16px;
  right: 32px;
`

const Layout = styled.div`
  padding-top: 34px;
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`

const Element = styled(Link)<{ imageURL: string }>`
  ${text_h1}
  ${colors.lightGray}

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
      ${colors.white}
      background-color: rgba(0, 0, 0, 0.4);
      background-blend-mode: darken;
    }
  }
`

const Carousel = styled(Link)<{ imageURL: string }>`
  ${text_h1}
  ${colors.lightGray}  

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
