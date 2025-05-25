import pkg from "mongoose";
const { Schema, model, ObjectId } = pkg;

const nutritionSchema = new Schema({
  calories: { type: String, required: true },
  protein: { type: String, required: true }, // Белки
  fat: { type: String, required: true }, // Жиры
  carbs: { type: String, required: true }, // Углеводы
});

export const Recipe = model(
  "Recipe",
  new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    section: { type: ObjectId, ref: "Section", required: true },
    categories: [{ type: ObjectId, ref: "Category", required: true }],
    ingredients: [
      {
        ingredient: {
          type: ObjectId,
          ref: "Ingredient",
        },
        amount: {
          type: String,
        },
      },
    ],
    rating: { type: Number, required: true },
    recipe: { type: String },
    image: { type: String },
    timeToCook: { type: String },
    nutrition: { type: nutritionSchema },
  })
);
