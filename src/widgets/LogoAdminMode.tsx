import styled from 'styled-components'

import { COLORS } from '@shared/styles/colors'

export const LogoAdminMode = () => {
    return (
        <Layout>
            <Heart>❤️</Heart>
            <Name>Menu</Name>
            <SubnameContainer>
                <Subname>ADMIN</Subname>
            </SubnameContainer>
        </Layout>
    )
}
const Subname = styled.div`
    width: 43px;
    height: 29px;
    margin: 0;

    font-family: 'Rozovii Chulok', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 29px;
    color: #ffffff;
    text-transform: uppercase;
    color: ${COLORS.danger};
`

const SubnameContainer = styled.div`
    position: relative;
    top: 0;
    right: 5px;
    display: flex;
    padding-top: 13px;
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
    padding-top: 20px;
    padding-bottom: 10px;
    height: 47px;
    display: flex;
    align-items: center;
    justify-content: center;
`
