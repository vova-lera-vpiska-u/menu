import { RouterProvider } from 'react-router-dom'
import './App.css'
import styled, { createGlobalStyle } from 'styled-components'
import RozoviiChulokTtf from '/fonts/Rozovii Chulok.ttf'
import Enthlapy298Otf from '/fonts/enthalpy298regular.otf'
import AlumniSansRegularTtf from '/fonts/AlumniSans-Regular.ttf'
import { router } from '../shared/routes/router'

export function App() {
  return (
    <>
      <FontStyles />
      <RouterProvider router={router} />
      <Version>v{import.meta.env.VITE_APP_VERSION}</Version>
    </>
  )
}

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

const Version = styled.div`
  position: absolute;
  bottom: 0%;
  right: 0%;
  padding: 10px;
`
