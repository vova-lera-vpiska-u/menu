import { createHashRouter } from 'react-router-dom'
import { publicRoutes } from './public/routes'
import { privateRoutes } from './private/private'
import { ProtectedRoutes } from './private/ProtectedRoutes'
import { PublicRoutes } from './public/PublicRoutes'
import { generalRoutes } from './general/routes'

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
  }
)
