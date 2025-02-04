import { Navigate, Outlet } from 'react-router-dom'
import { userModel } from '../../../entities/user/model'
import { useUnit } from 'effector-react'

export const PublicRoutes = () => {
  const [user] = useUnit([userModel.stores.user])

  return !user ? <Outlet /> : <Navigate to="/" replace />
}
