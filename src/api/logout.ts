import { url } from './consts'

export const logout = () => {
  fetch(`${url}/logout`, {
    method: 'POST',
    credentials: 'include',
  }).then(() => localStorage.removeItem('admin'))
}
