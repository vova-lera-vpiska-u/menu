import { Login } from '@pages/Login'

import { LOGIN_PATH } from '@shared/routes/public-paths'

export const publicRoutes = [
    {
        path: LOGIN_PATH,
        element: <Login />,
    },
]
