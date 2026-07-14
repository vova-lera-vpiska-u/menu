import { createGlobalStyle } from 'styled-components'

import AlumniSansRegularTtf from './fonts/AlumniSans-Regular.ttf'
import RozoviiChulokTtf from './fonts/Rozovii Chulok.ttf'
import Enthlapy298Otf from './fonts/enthalpy298regular.otf'

export const FontStyles = createGlobalStyle`
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
