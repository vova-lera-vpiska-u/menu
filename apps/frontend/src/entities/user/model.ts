import { createEffect, createEvent, createStore, sample } from 'effector'

import { appStarted } from '@shared/model'

import { url } from '@shared/api/consts'

type Login = {
    username: string
    password: string
}

type Session = {
    username: string
    role: string
}

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

const checkSessionFx = createEffect(async () => {
    const response = await fetch(`${url}/me`, {
        method: 'GET',
        credentials: 'include',
    })
    if (!response.ok) throw new Error(response.statusText)
    const session: Session = await response.json()
    return session.username
})

const $user = createStore<string | null>(null)
const $loginError = createStore<string | null>(null)
const $sessionChecked = createStore(false)

const login = createEvent<Login>()
const logout = createEvent()

// Restore auth state from the httpOnly jwt cookie on app load.
sample({
    clock: appStarted,
    target: checkSessionFx,
})
sample({
    clock: checkSessionFx.doneData,
    target: $user,
})
sample({
    clock: checkSessionFx.finally,
    fn: () => true,
    target: $sessionChecked,
})

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
sample({
    clock: logout,
    fn: () => null,
    target: $user,
})

export const userModel = {
    effects: { loginFx },
    stores: {
        user: $user,
        loginError: $loginError,
        loginPending: loginFx.pending,
        sessionChecked: $sessionChecked,
    },
    events: { login, logout },
}
