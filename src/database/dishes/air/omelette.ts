import { Dish } from '../../types'

export const omlette: Dish = {
  name: 'Omlette',
  categories: ['eggs', 'breakfast'],
  image:
    'https://media.istockphoto.com/id/1254381869/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D0%BF%D0%B0%D1%80%D0%B6%D0%B0-%D1%84%D1%80%D0%B8%D1%82%D1%82%D0%B0%D1%82%D0%B0-%D1%81-%D1%81%D1%8B%D1%80%D0%BE%D0%BC-%D0%BF%D0%B0%D1%80%D0%BC%D0%B0.jpg?s=1024x1024&w=is&k=20&c=EVlaAyXon1C36gW_ywvZPf96oeQy4wj_QgUQ9IiCSpk=',
  rating: 4.5,
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
}
