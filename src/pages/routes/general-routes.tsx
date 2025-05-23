import { Main } from '@pages/Main'
import { RecipeList } from '@pages/RecipeList'
import { Recipe } from '@pages/recipe'

import {
    AIR_PATH,
    ALL_RECIPES_PATH,
    DESSERTS_PATH,
    EARTH_PATH,
    FIRE_PATH,
    HOMEPAGE_PATH,
    RECIPE_PATH,
    WATER_PATH,
} from '@shared/routes/shared-paths'

export const generalRoutes = [
    {
        path: HOMEPAGE_PATH,
        element: <Main />,
    },
    {
        path: AIR_PATH,
        element: <RecipeList title="AIR" />,
    },
    {
        path: FIRE_PATH,
        element: <RecipeList title="FIRE" />,
    },
    {
        path: WATER_PATH,
        element: <RecipeList title="WATER" />,
    },
    {
        path: EARTH_PATH,
        element: <RecipeList title="EARTH" />,
    },
    {
        path: DESSERTS_PATH,
        element: <RecipeList title="DESSERTS" />,
    },
    {
        path: ALL_RECIPES_PATH,
        element: <RecipeList title="ALL" />,
    },
    {
        path: RECIPE_PATH,
        element: <Recipe />,
    },
]
