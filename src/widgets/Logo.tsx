import { useUnit } from 'effector-react'
import styled from 'styled-components'

import { userModel } from '@entities/user/model'

import { COLORS } from '@shared/styles/colors'

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

const AdminIcon = () => {
    return <AdminLogo>ADMIN</AdminLogo>
}

const AdminLogo = styled.div`
    font-family: 'Rozovii Chulok', sans-serif;
    font-style: normal;
    font-size: 20px;
    line-height: 29px;
    color: #ffffff;
    text-transform: uppercase;
    color: ${COLORS.danger};
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
    left: calc(50% - 75px);
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
    position: relative;
    top: 0;
    right: 5px;
    display: flex;
    padding-top: 13px;
`
