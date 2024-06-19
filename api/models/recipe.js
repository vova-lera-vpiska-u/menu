import pkg from "mongoose";
const { Schema, model, ObjectId } = pkg;

export const Recipe = model(
  "Recipe",
  new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
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
  })
);
