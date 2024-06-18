import pkg from "mongoose";
const { Schema, model } = pkg;

const Recipe = new Schema({
  name: { type: String, required: true },
});

export default model("Recipe", Recipe);
