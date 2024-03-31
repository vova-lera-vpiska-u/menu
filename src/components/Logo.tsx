import styled, { createGlobalStyle } from 'styled-components'

export const Logo = () => {
  return (
    <Layout>
      <Heart>❤️</Heart>
      <Name>Menu</Name>
    </Layout>
  )
}

export default createGlobalStyle`
`

const Name = styled.h1`
  width: 74px;
  height: 47px;
  margin: 0;

  font-family: 'Rozovii Chulok', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 47px;
  color: #ffffff;
`

const Heart = styled.div`
  position: absolute;
  scale: 0.7;
  left: calc(50% - 50px);
  top: calc(50% - 3px);
  transform: rotate(-25deg);
`

const Layout = styled.div`
  position: relative;
  padding-top: 20px;
  padding-bottom: 10px;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
`
