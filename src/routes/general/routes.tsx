import { DishList } from '../../components/DishList'
import { Main } from '../../pages/Main'

export const generalRoutes = [
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
]
