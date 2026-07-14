import { useNavigate } from 'react-router-dom'

import { useUnit } from 'effector-react'
import styled from 'styled-components'

import { GoBackButton } from '@widgets/GoBackButton'
import { RecipeForm } from '@widgets/RecipeForm'

import { userModel } from '@entities/user/model'

import { HOMEPAGE_PATH } from '@shared/routes/shared-paths'

export const Admin = () => {
    return (
        <div>
            <Header />
            <RecipeForm mode="create" />
        </div>
    )
}

const Header = () => {
    const navigate = useNavigate()
    const [logout] = useUnit([userModel.events.logout])

    return (
        <>
            <Button
                onClick={() => {
                    logout()
                    navigate(HOMEPAGE_PATH, { replace: true })
                }}
            >
                Logout
            </Button>
            <Nav>
                <GoBackButton />
                <Title>ADMIN</Title>
            </Nav>
        </>
    )
}

const Nav = styled.div`
    height: calc(26px + 4rem);
    display: flex;
    align-items: center;
    justify-content: center;
`

const Title = styled.h2`
    font-family: 'Enthalpy 298';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    color: #ffffff;
`

const Button = styled.button`
    position: absolute;
    top: 16px;
    right: 32px;
`
