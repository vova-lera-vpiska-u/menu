import { Dish } from '../../types'

export const potatoPancakes: Dish = {
  name: 'Potato Pancakes',
  category: 'breakfast',
  description: 'Potato pancakes with butter and maple syrup',
  timeToCook: '10 min*',
  ingredients: [
    {
      ingridient: {
        name: 'Potato',
        price: 1.99,
      },
      amount: '1 pound',
    },
    {
      ingridient: {
        name: 'Butter',
        price: 0.99,
      },
      amount: '1 cup',
    },
  ],
  image:
    'https://media.istockphoto.com/id/1313535028/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BA%D0%B0%D1%80%D1%82%D0%BE%D1%84%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-%D0%B1%D0%BB%D0%B8%D0%BD%D1%8B.jpg?s=1024x1024&w=is&k=20&c=GOWej9pRD_34bgfXePATSrK-fIE5FIY8sfMl1I8LlKo=',
  rating: 4.5,
}
