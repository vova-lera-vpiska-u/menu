import styled from 'styled-components'
import { AdminIcon } from '../icons/AdminIcon'
import { userModel } from '../entities/user/model'
import { useUnit } from 'effector-react'

export const Logo = () => {
  const [user] = useUnit([userModel.stores.user])
  return (
    <Layout>
      <Heart>❤️</Heart>
      <Name>Menu</Name>
      {user && (
        <AdminIconStyled>
          <AdminIcon />
        </AdminIconStyled>
      )}
    </Layout>
  )
}

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
  left: calc(50% - 52px);
  top: calc(50% - 3px);
  transform: rotate(-25deg);
`

const Layout = styled.div`
  user-select: none;
  position: relative;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const AdminIconStyled = styled.div`
  position: absolute;
  left: calc(50% + 30px);
  top: calc(50% - 3px);
`
