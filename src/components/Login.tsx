import styled from 'styled-components'
import { login } from '../api/login'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate()
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        login(e.currentTarget.username.value, e.currentTarget.password.value)
        navigate('/admin', { replace: true })
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
