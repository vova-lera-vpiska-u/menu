import { Admin } from '@pages/admin/admin'
import { Item } from '@pages/item/item'
import { UiKit } from '@pages/ui-kit'

import { ADMIN_ITEM_PATH, ADMIN_PATH, UI_KIT_PATH } from '@shared/routes/private-paths'

export const privateRoutes = [
    {
        path: ADMIN_PATH,
        element: <Admin />,
    },
    {
        path: ADMIN_ITEM_PATH,
        element: <Item />,
    },
    {
        path: UI_KIT_PATH,
        element: <UiKit />,
    },
]
