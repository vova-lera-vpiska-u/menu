import { createHashRouter } from 'react-router-dom'

import { ProtectedRoutes } from '@pages/routes/ProtectedRoutes'
import { PublicRoutes } from '@pages/routes/PublicRoutes'
import { generalRoutes } from '@pages/routes/general-routes'
import { privateRoutes } from '@pages/routes/private-routes'
import { publicRoutes } from '@pages/routes/public-routes'

import { HOMEPAGE_PATH } from '@shared/routes/shared-paths'

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
        basename: HOMEPAGE_PATH,
    },
)
