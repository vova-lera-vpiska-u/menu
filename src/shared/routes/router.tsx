import { createHashRouter } from 'react-router-dom'

import { generalRoutes } from './general/routes'
import { ProtectedRoutes } from './private/ProtectedRoutes'
import { privateRoutes } from './private/private'
import { PublicRoutes } from './public/PublicRoutes'
import { publicRoutes } from './public/routes'

export const router = createHashRouter(
    [
        ...generalRoutes,
        {
            element: <PublicRoutes />,
            children: publicRoutes,
        },
        {
            element: <ProtectedRoutes />,
            children: privateRoutes,
        },
    ],
    {
        basename: '/',
    },
)
