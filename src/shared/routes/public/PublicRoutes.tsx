import { Navigate, Outlet } from 'react-router-dom'

import { useUnit } from 'effector-react'

import { userModel } from '@entities/user/model'

export const PublicRoutes = () => {
    const [user] = useUnit([userModel.stores.user])

    return !user ? <Outlet /> : <Navigate to="/" replace />
}
