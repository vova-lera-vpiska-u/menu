import { Admin } from '../../components/admin/Admin'
import { Item } from '../../components/admin/Item'

export const privateRoutes = [
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/admin/:id',
    element: <Item />,
  },
]
