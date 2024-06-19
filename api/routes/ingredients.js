import { Router } from "express";
import { ingredient } from "../models/ingredient.js";

export const ingredientsRouter = new Router();
ingredientsRouter.get("/", async (req, res) => {
  const ingredients = await ingredient.find();
  res.send(ingredients).status(200);
});
ingredientsRouter.post("/", async (req, res) => {
  const ingredient = new ingredient(req.body);
  await ingredient.save();
  res.send(ingredient).status(200);
});
