import { Admin } from '@widgets/admin/Admin'
import { Item } from '@widgets/admin/item/Item'

import { ADMIN_ITEM_PATH, ADMIN_PATH } from './paths'

export const privateRoutes = [
    {
        path: ADMIN_PATH,
        element: <Admin />,
    },
    {
        path: ADMIN_ITEM_PATH,
        element: <Item />,
    },
]
