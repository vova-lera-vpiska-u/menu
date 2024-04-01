export type Dish = {
  name: string
  description: string
  category: Category
  ingredients: {
    ingridient: Ingridient
    amount: string
  }[]
  rating: number
  recipe: string
  image: string
  timeToCook: string
}

export type Category =
  | 'pasta'
  | 'cocktails'
  | 'pizza'
  | 'eggs'
  | 'asia'
  | 'fastfood'

export type Ingridient = {
  name: string
  price: number
}
