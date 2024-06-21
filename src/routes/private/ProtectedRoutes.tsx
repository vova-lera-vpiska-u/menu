import { Navigate, Outlet } from 'react-router-dom'
import { LOGIN_PATH } from '../public/paths'
import { userModel } from '../../entities/user/model'
import { useUnit } from 'effector-react'

export const ProtectedRoutes = () => {
  const [user] = useUnit([userModel.stores.user])

  return user ? <Outlet /> : <Navigate to={LOGIN_PATH} replace />
}
