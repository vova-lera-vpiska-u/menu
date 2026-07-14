import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useUnit } from 'effector-react'

import { routingModel } from '@entities/routing/model'
import { userModel } from '@entities/user/model'

import { LOGIN_PATH } from '@shared/routes/public-paths'

export const ProtectedRoutes = () => {
    const [user, sessionChecked, redirected] = useUnit([
        userModel.stores.user,
        userModel.stores.sessionChecked,
        routingModel.events.redirected,
    ])
    const location = useLocation()

    if (!sessionChecked) {
        return null
    }

    if (!user) {
        redirected(location.pathname)
        return <Navigate to={LOGIN_PATH} replace />
    }

    return <Outlet />
}
