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
}

export type Category = 'Pasta' | 'Cocktails'

export type Ingridient = {
  name: string
  price: number
}
