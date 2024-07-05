import { RecipeList } from '../../components/RecipeList'
import { Main } from '../../pages/Main'

export const generalRoutes = [
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/air',
    element: <RecipeList title="AIR" />,
  },
  {
    path: '/fire',
    element: <RecipeList title="FIRE" />,
  },
  {
    path: '/water',
    element: <RecipeList title="WATER" />,
  },
  {
    path: '/earth',
    element: <RecipeList title="EARTH" />,
  },
  {
    path: '/desserts',
    element: <RecipeList title="DESSERTS" />,
  },
  {
    path: '/all',
    element: <RecipeList title="ALL" />,
  },
]
