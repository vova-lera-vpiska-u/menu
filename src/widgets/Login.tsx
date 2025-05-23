import { useNavigate } from 'react-router-dom'

import { useUnit } from 'effector-react'
import styled from 'styled-components'

import { routingModel } from '../entities/routing/model'
import { userModel } from '../entities/user/model'
import { COLORS } from '../shared/styles/colors'
import { TEXT_SIZE_1 } from '../shared/styles/fonts'
import { FieldBig } from '../shared/ui/FieldBig'
import { BigButton } from './Buttons/BigButton'
import { Checkbox } from './Buttons/Ckeckbox'
import { LogoAdminMode } from './LogoAdminMode'

export const Login = () => {
    const navigate = useNavigate()

    const [login, clearRedirect, redirectedFrom] = useUnit([
        userModel.events.login,
        routingModel.events.clear,
        routingModel.stores.from,
    ])
    return (
        <>
            <LogoAdminMode />
            <Layout>
                <Title>AUTORIZATION</Title>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault()
                        login({
                            username: e.currentTarget.username.value,
                            password: e.currentTarget.password.value,
                        })
                        navigate(redirectedFrom || '/admin', { replace: true })
                        clearRedirect()
                    }}
                >
                    <FieldBig type="text" name="username" placeholder="Who?"></FieldBig>
                    <FieldBig type="password" name="password" placeholder="Password"></FieldBig>
                    <Checkbox gap="8px" labelColor={COLORS.lightGray}>
                        By clicking on the button, I confirm that I have no intention of poisoning anyone, and I
                        undertake to provide the information in full
                    </Checkbox>
                    <BigButton>AUF</BigButton>
                </Form>
            </Layout>
        </>
    )
}

const Layout = styled.div`
    display: flex;
    flex-direction: column;
`

const Title = styled.h1`
    ${TEXT_SIZE_1};
    color: ${COLORS.white};
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    min-height: 100vh;
    width: 100%;
`
