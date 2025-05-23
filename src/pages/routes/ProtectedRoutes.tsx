import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useUnit } from 'effector-react'

import { routingModel } from '@entities/routing/model'
import { userModel } from '@entities/user/model'

import { LOGIN_PATH } from '@shared/routes/public-paths'

export const ProtectedRoutes = () => {
    const [user, redirected] = useUnit([userModel.stores.user, routingModel.events.redirected])
    const location = useLocation()

    if (!user) {
        redirected(location.pathname)
    }

    return user ? <Outlet /> : <Navigate to={LOGIN_PATH} replace />
}
