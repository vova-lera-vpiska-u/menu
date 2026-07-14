import { Navigate, Outlet } from 'react-router-dom'

import { useUnit } from 'effector-react'

import { userModel } from '@entities/user/model'

export const PublicRoutes = () => {
    const [user, sessionChecked] = useUnit([userModel.stores.user, userModel.stores.sessionChecked])

    if (!sessionChecked) {
        return null
    }

    return !user ? <Outlet /> : <Navigate to="/" replace />
}
