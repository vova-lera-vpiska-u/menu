import { createBrowserRouter } from 'react-router-dom'
import { publicRoutes } from './public/routes'
import { privateRoutes } from './private/private'
import { ProtectedRoutes } from './private/ProtectedRoutes'

export const router = createBrowserRouter(
  [
    ...publicRoutes,
    {
      element: <ProtectedRoutes />,
      children: privateRoutes,
    },
  ],
  {
    basename: '/menu',
  }
)
