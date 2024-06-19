import pkg from "mongoose";
const { Schema, model } = pkg;

export const ingredient = model(
  "ingredient",
  new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number },
  })
);
