export type Category = {
    _id: string
    name: string
}

export type Section = {
    _id: string
    name: string
}

export type Recipe = {
    _id: string
    name: string
    rating: number
    section: Section
    categories: Category[]
    description?: string
    ingredients?: {
        ingredient: Ingredient
        amount: string
    }[]
    recipe?: string
    image?: string
    timeToCook?: string
}

export type Ingredient = {
    _id: string
    name: string
    price?: number
}
