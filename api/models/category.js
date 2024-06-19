import pkg from "mongoose";
const { Schema, model, ObjectId } = pkg;

export const Category = model(
  "Category",
  new Schema({
    name: { type: String, required: true, unique: true },
    recipes: [{ type: ObjectId, ref: "Recipe" }],
  })
);
