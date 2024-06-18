export type Dish = {
  name: string
  description?: string
  categories: Category[]
  ingredients?: {
    ingridient: Ingridient
    amount: string
  }[]
  rating: number
  recipe?: string
  image: string
  timeToCook?: string
}

export type Category =
  | 'pasta'
  | 'cocktails'
  | 'pizza'
  | 'asia'
  | 'fastfood'
  | 'breakfast'
  | 'cake'
  | 'salad'
  | 'dessert'
  | 'light'
  | 'russian'
  | 'italian'
  | 'middle east'
  | CategoryIngredient

export type Ingridient = {
  name: string
  price: number
}

type CategoryIngredient = 'eggs' | 'chicken' | 'potato' | 'flour' | 'nut'
