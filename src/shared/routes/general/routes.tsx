import { Main } from '../../../pages/Main'
import { Recipe } from '../../../widgets/Recipe'
import { RecipeList } from '../../../widgets/RecipeList'

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
    {
        path: '/:title/:id',
        element: <Recipe />,
    },
]
