import { RouterProvider } from 'react-router-dom'
import './App.css'
import { createGlobalStyle } from 'styled-components'
import RozoviiChulokTtf from '/fonts/Rozovii Chulok.ttf'
import Enthlapy298Otf from '/fonts/enthalpy298regular.otf'
import AlumniSansRegularTtf from '/fonts/AlumniSans-Regular.ttf'
import { router } from './routes/router'

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
  return (
    <>
      <FontStyles />
      <RouterProvider router={router} />
    </>
  )
}

export default App
