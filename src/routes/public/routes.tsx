import { DishList } from '../../components/DishList'
import { Login } from '../../components/Login'
import { Main } from '../../pages/Main'
import { LOGIN_PATH } from './paths'

export const publicRoutes = [
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/air',
    element: <DishList title="AIR" />,
  },
  {
    path: '/fire',
    element: <DishList title="FIRE" />,
  },
  {
    path: '/water',
    element: <DishList title="WATER" />,
  },
  {
    path: '/earth',
    element: <DishList title="EARTH" />,
  },
  {
    path: '/desserts',
    element: <DishList title="DESSERTS" />,
  },
  {
    path: '/all',
    element: <DishList title="ALL" />,
  },
  {
    path: LOGIN_PATH,
    element: <Login />,
  },
]
