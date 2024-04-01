import { Dish } from '../../types'

export const friedEggsWithVeggies: Dish = {
  name: 'Fried eggs with viggies',
  description: 'Eggs with viggies',
  category: 'eggs',
  timeToCook: '10 min*',
  ingredients: [
    {
      ingridient: {
        name: 'Eggs',
        price: 1.99,
      },
      amount: '3',
    },
  ],
  image:
    'https://media.istockphoto.com/id/1934873452/ru/%D1%84%D0%BE%D1%82%D0%BE/frittata-with-tomatoes-and-spinach.jpg?s=1024x1024&w=is&k=20&c=oVAwn3s265HsrkmRv4LmOcC6IGaJviAMz7G8RvVE_nc=',
  rating: 4.5,
}
