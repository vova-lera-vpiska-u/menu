import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { LOGIN_PATH } from '../public/paths'
import { userModel } from '../../entities/user/model'
import { useUnit } from 'effector-react'
import { routingModel } from '../../entities/routing/model'

export const ProtectedRoutes = () => {
  const [user, redirected] = useUnit([
    userModel.stores.user,
    routingModel.events.redirected,
  ])
  const location = useLocation()

  if (!user) {
    redirected(location.pathname)
  }

  return user ? <Outlet /> : <Navigate to={LOGIN_PATH} replace />
}
