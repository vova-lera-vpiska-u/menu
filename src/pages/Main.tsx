import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Logo } from '../components/Logo'
import { LOGIN_PATH } from '../routes/public/paths'
import { useUnit } from 'effector-react'
import { userModel } from '../entities/user/model'
import { ADMIN_PATH } from '../routes/private/paths'

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
        <Element to={'/air'}>AIR</Element>
        <Element to={'/fire'}>FIRE</Element>
        <Element to={'/water'}>WATER</Element>
        <Element to={'/earth'}>EARTH</Element>
        <WideElement to={'/desserts'}>DESSERTS</WideElement>
        <Carousel to={'/all'}>ALL</Carousel>
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

const Element = styled(Link)`
  display: grid;
  place-content: center;
  aspect-ratio: 1;
  border: 1px solid white;
  border-radius: 7px;
`

const WideElement = styled(Element)`
  grid-column: span 2;
  aspect-ratio: 5 / 1;
`

const Carousel = styled(Link)`
  grid-column: span 2;
  aspect-ratio: 2 / 1;
  display: grid;
  place-content: center;
  border: 1px dashed white;
  border-radius: 7px;
`
