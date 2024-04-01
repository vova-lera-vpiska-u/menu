import { Dish } from '../../types'

export const shakshouka: Dish = {
  name: 'Shakshouka',
  description: 'Shakshouka with olive oil, onion, and garlic',
  categories: ['eggs', 'breakfast'],
  timeToCook: '30 min*',
  ingredients: [
    {
      ingridient: {
        name: 'Pasta',
        price: 2.99,
      },
      amount: '1 pound',
    },
  ],
  image:
    'https://media.istockphoto.com/id/925256310/photo/shakshouka-eggs.jpg?s=2048x2048&w=is&k=20&c=7Mz0SJdOA5ZByktrJEa022IPuuXUQIoWTIok4Ki33Lo=',
  rating: 4.5,
}
