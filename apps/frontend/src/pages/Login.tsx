import { useNavigate } from 'react-router-dom'

import { useUnit } from 'effector-react'
import styled from 'styled-components'

import { BigButton } from '@widgets/Buttons/BigButton'
import { Checkbox } from '@widgets/Buttons/Checkbox'
import { Logo } from '@widgets/Logo'

import { routingModel } from '@entities/routing/model'
import { userModel } from '@entities/user/model'

import { ADMIN_PATH } from '@shared/routes/private-paths'
import { media } from '@shared/styles/breakpoints'
import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_1 } from '@shared/styles/fonts'
import { FieldBig } from '@shared/ui/FieldBig'

export const Login = () => {
    const navigate = useNavigate()

    const [login, pending, loginError, clearRedirect, redirectedFrom] = useUnit([
        userModel.effects.loginFx,
        userModel.stores.loginPending,
        userModel.stores.loginError,
        routingModel.events.clear,
        routingModel.stores.from,
    ])

    return (
        <>
            <Logo />
            <Layout>
                <Title>AUTHORIZATION</Title>
                <Form
                    onSubmit={async (e) => {
                        e.preventDefault()
                        try {
                            await login({
                                username: e.currentTarget.username.value,
                                password: e.currentTarget.password.value,
                            })
                            navigate(redirectedFrom || ADMIN_PATH, { replace: true })
                            clearRedirect()
                        } catch {
                            // error surfaced via loginError store
                        }
                    }}
                >
                    <FieldBig type="text" name="username" placeholder="Who?"></FieldBig>
                    <FieldBig type="password" name="password" placeholder="Password"></FieldBig>
                    <Checkbox gap="8px" labelColor={COLORS.lightGray}>
                        By clicking this button, I confirm that I have no intention of poisoning anyone and I agree to
                        provide complete information
                    </Checkbox>
                    {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
                    <BigButton disabled={pending}>{pending ? 'Logging in…' : 'Log In'}</BigButton>
                </Form>
            </Layout>
        </>
    )
}

const Layout = styled.div`
    display: flex;
    flex-direction: column;

    ${media.tablet} {
        max-width: 420px;
        margin-inline: auto;
    }
`

const Title = styled.h1`
    ${TEXT_SIZE_1};
    color: ${COLORS.white};
`

const ErrorMessage = styled.span`
    color: ${COLORS.danger};
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    min-height: 100vh;
    width: 100%;
`
