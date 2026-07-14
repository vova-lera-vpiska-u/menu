import { createEffect, createEvent, createStore, sample } from 'effector'

import { url } from '@shared/api/consts'

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
const $loginError = createStore<string | null>(null)

sample({
    clock: login,
    target: loginFx,
})
sample({
    clock: [login, loginFx.done],
    fn: () => null,
    target: $loginError,
})
sample({
    clock: loginFx.doneData,
    target: $user,
})
sample({
    clock: loginFx.fail,
    fn: () => 'Wrong username or password',
    target: $loginError,
})

sample({
    clock: logout,
    target: logoutFx,
})

export const userModel = {
    effects: { loginFx },
    stores: { user: $user, loginError: $loginError, loginPending: loginFx.pending },
    events: { login, logout },
}
