import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Main } from './pages/Main'
import { DishList } from './components/DishList'
import { createGlobalStyle } from 'styled-components'
import RozoviiChulokTtf from '/fonts/Rozovii Chulok.ttf'
import Enthlapy298Otf from '/fonts/enthalpy298regular.otf'
import AlumniSansRegularTtf from '/fonts/AlumniSans-Regular.ttf'
import { Admin } from './components/admin/Admin'
import { Item } from './components/admin/Item'

const FontStyles = createGlobalStyle`

@font-face {
    font-family: 'Rozovii Chulok';
    src: url(${RozoviiChulokTtf}) format('truetype');
  }

@font-face {
    font-family: 'Enthalpy 298';
    src: url(${Enthlapy298Otf}) format('opentype');
  }

@font-face {
    font-family: 'Alumni Sans';
    src: url(${AlumniSansRegularTtf}) format('truetype');
  }
`

function App() {
  const router = createBrowserRouter(
    [
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
        path: '/admin',
        element: <Admin />,
      },
      {
        path: '/admin/:id',
        element: <Item />,
      },
    ],
    {
      basename: '/menu',
    }
  )

  return (
    <>
      <FontStyles />
      <RouterProvider router={router} />
    </>
    // <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    //   {menu.map((dish) => (
    //     <div key={dish.name} style={{border: '1px solid white', padding: '10px', }}>
    //       <h1>{dish.name}</h1>
    //       <h3>{dish.category}</h3>
    //       <h2>{dish.description}</h2>
    //       <ul>
    //         {dish.ingredients.map((ingredient) => (
    //           <li key={ingredient.ingredient.name}>
    //             {ingredient.ingredient.name} - {ingredient.amount}
    //           </li>
    //         ))}
    //       </ul>
    //       <p>{dish.recipe}</p>
    //       <img src={dish.image} alt={dish.name} style={{maxWidth: '100%'}}/>

    //     </div>
    //   ))}
    // </div>
  )
}

export default App
