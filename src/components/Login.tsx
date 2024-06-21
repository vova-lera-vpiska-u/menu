import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { userModel } from '../entities/user/model'
import { routingModel } from '../entities/routing/model'

export const Login = () => {
  const navigate = useNavigate()

  const [login, clearRedirect, redirectedFrom] = useUnit([
    userModel.events.login,
    routingModel.events.clear,
    routingModel.stores.from,
  ])
  return (
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
      <input type="text" name="username" />
      <input type="password" name="password" />
      <button type="submit">Login</button>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 100vh;
`
