import { caesar } from './dishes/earth/ceasar'
import { cheesecake } from './base/cheesecake'
import { cubaLibre } from './dishes/water/cubaLibre'
import { mojito } from './dishes/water/mojito'
import { pastaElPesto } from './dishes/fire/pastaAlPesto'
import { potatoPancakes } from './dishes/air/potatoPancakes'
import { shakshouka } from './dishes/air/shakshouka'
import { Dish } from './types'
import { omlette } from './dishes/air/omelette'
import { friedEggsWithVeggies } from './dishes/air/friedEggsWithVeggies'
import { blini } from './dishes/air/blini'

export const air: Dish[] = [
  potatoPancakes,
  shakshouka,
  blini,
  omlette,
  friedEggsWithVeggies,
]
export const fire: Dish[] = [pastaElPesto]
export const water: Dish[] = [mojito, cubaLibre]
export const earth: Dish[] = [caesar]
export const desserts: Dish[] = [cheesecake]
export const menu: Dish[] = [...air, ...fire, ...water, ...earth, ...desserts]
