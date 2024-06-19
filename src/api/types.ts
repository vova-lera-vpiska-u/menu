export type Dish = {
  _id: string
  name: string
  description?: string
  categories: Category[]
  ingredients?: {
    ingredient: Ingredient
    amount: string
  }[]
  rating: number
  recipe?: string
  image: string
  timeToCook?: string
}

export type Category = {
  _id: string
  name: string
}

export type Ingredient = {
  _id: string
  name: string
  price: number
}
