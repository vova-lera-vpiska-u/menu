import { Navigate, Outlet } from 'react-router-dom'
import { LOGIN_PATH } from '../public/paths'

export const ProtectedRoutes = () => {
  const isAdmin = localStorage.getItem('admin') === 'true'

  return isAdmin ? <Outlet /> : <Navigate to={LOGIN_PATH} replace />
}
