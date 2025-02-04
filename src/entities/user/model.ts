import { createEffect, createEvent, createStore, sample } from 'effector'
import { url } from '../../shared/api/consts'

type Login = {
  username: string
  password: string
}

const login = createEvent<Login>()
const logout = createEvent()

const loginFx = createEffect(async ({ username, password }: Login) => {
  const response = await fetch(`${url}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      username,
      password,
    }),
  })
  if (!response.ok) throw new Error(response.statusText)
  return username
})

const logoutFx = createEffect(async () => {
  await fetch(`${url}/logout`, {
    method: 'POST',
    credentials: 'include',
  })
})

const $user = createStore<string | null>(null).reset(logout)

sample({
  clock: login,
  target: loginFx,
})
sample({
  clock: loginFx.doneData,
  target: $user,
})

sample({
  clock: logout,
  target: logoutFx,
})
sample({
  clock: logoutFx.fail,
  fn: () => 'err',
  target: $user,
})

export const userModel = {
  stores: { user: $user },
  events: { login, logout },
}
