import { Dish } from '../types'

export const cubaLibre: Dish = {
  name: 'Cuba Libre',
  category: 'cocktails',
  description:
    'Cuba Libre is a classic cocktail made with gin, lime juice, and simple syrup.',
  timeToCook: '20 min',
  ingredients: [
    {
      ingridient: {
        name: 'Gin',
        price: 3.99,
      },
      amount: '1 1/2 oz',
    },
    {
      ingridient: {
        name: 'Lime juice',
        price: 1.99,
      },
      amount: '1 oz',
    },
    {
      ingridient: {
        name: 'Simple syrup',
        price: 0.99,
      },
      amount: '1/2 oz',
    },
  ],
  recipe:
    'Combine gin, lime juice, and simple syrup in a cocktail shaker. Add ice cubes, and shake until well-chilled. Strain into a chilled cocktail glass.',
  image:
    'https://media.istockphoto.com/id/480045080/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%80%D0%BE%D0%BC-%D0%B8-cola-%D0%BA%D1%83%D0%B1%D0%B0-%D0%BB%D0%B8%D0%B1%D1%80%D0%B5.jpg?s=1024x1024&w=is&k=20&c=LUNaPyh4RdsVcWcwySB8utiwB2r3aJXTMTClG7e_byo=',
  rating: 5,
}
