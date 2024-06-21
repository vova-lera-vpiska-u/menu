import { url } from './consts'

export const login = (username: string, password: string) => {
  fetch(`${url}/login`, {
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
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText)
      localStorage.setItem('admin', 'true')
    })
    .catch(() => {
      localStorage.removeItem('admin')
    })
}
