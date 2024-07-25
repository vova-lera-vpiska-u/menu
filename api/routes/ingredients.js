import { Router } from "express";
import { ingredient } from "../models/ingredient.js";
import { expressjwt } from "express-jwt";
import { jwt } from "../jwt.js";

export const ingredientsRouter = new Router();
ingredientsRouter.get("/", async (req, res) => {
  const ingredients = await ingredient.find();
  res.send(ingredients).status(200);
});
ingredientsRouter.post("/", expressjwt(jwt), async (req, res) => {
  const ingredient = new ingredient(req.body);
  await ingredient.save();
  res.send(ingredient).status(200);
});
