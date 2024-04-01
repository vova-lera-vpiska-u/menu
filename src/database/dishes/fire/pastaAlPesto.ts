import { Dish } from '../../types'

export const pastaElPesto: Dish = {
  name: 'Pasta Al Pesto',
  description: 'Pasta with pesto sauce, basil, and olives',
  category: 'pasta',
  timeToCook: '30 min*',
  ingredients: [
    {
      ingridient: {
        name: 'Pasta',
        price: 2.99,
      },
      amount: '1 pound',
    },
    {
      ingridient: {
        name: 'Pesto Sauce',
        price: 1.99,
      },
      amount: '1 cup',
    },
    {
      ingridient: {
        name: 'Basil Leaves',
        price: 0.99,
      },
      amount: '2 leaves',
    },
    {
      ingridient: {
        name: 'Olive Oil',
        price: 1.49,
      },
      amount: '1 cup',
    },
  ],
  rating: 4.5,
  recipe:
    '1. Cook pasta according to package instructions. 2. Combine pesto sauce, basil, and olives. 3. Toss with cooked pasta.',
  image:
    'https://media.istockphoto.com/id/1045283212/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B2%D0%BA%D1%83%D1%81%D0%BD%D0%B0%D1%8F-%D0%BF%D0%B0%D1%81%D1%82%D0%B0-%D1%81-%D0%BF%D0%B5%D1%81%D1%82%D0%BE-%D0%BF%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D0%BD%D0%B0-%D1%82%D0%B0%D1%80%D0%B5%D0%BB%D0%BA%D0%B5.jpg?s=1024x1024&w=is&k=20&c=2eOa9apCQ4Fo0BFbRvOTVHC2wDJLEbqmatLi9fgg_3k=',
}
