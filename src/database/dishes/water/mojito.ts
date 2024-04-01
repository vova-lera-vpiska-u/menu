import { Dish } from '../../types'

export const mojito: Dish = {
  name: 'Mojito',
  description:
    'Mojito is a classic cocktail made with mint, lime juice, and club soda.',
  categories: ['cocktails'],
  timeToCook: '20 min*',
  ingredients: [
    {
      ingridient: {
        name: 'Mint',
        price: 0.99,
      },
      amount: '1/2 cup',
    },
    {
      ingridient: {
        name: 'Lime juice',
        price: 1.99,
      },
      amount: '1 cup',
    },
    {
      ingridient: {
        name: 'Club soda',
        price: 0.99,
      },
      amount: '1/2 cup',
    },
  ],
  rating: 5,
  recipe:
    'Combine all ingredients in a highball glass filled with ice. Garnish with lime wedge.',
  image:
    'https://media.istockphoto.com/id/1307546222/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BA%D0%BE%D0%BA%D1%82%D0%B5%D0%B9%D0%BB%D1%8C-%D0%BC%D0%BE%D1%85%D0%B8%D1%82%D0%BE-%D1%81-%D0%BB%D0%B0%D0%B9%D0%BC%D0%BE%D0%BC-%D0%B8-%D0%BC%D1%8F%D1%82%D0%BE%D0%B9.jpg?s=1024x1024&w=is&k=20&c=sJ3kf2I3nn8ApozNtloz4ZvRYytltWl1rrU1RYz3ZdM=',
}
