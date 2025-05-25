import { Router } from "express";
import { Recipe } from "../models/recipe.js";
import { expressjwt } from "express-jwt";
import { jwt } from "../jwt.js";

export const recipesRouter = new Router();
recipesRouter.post("/", expressjwt(jwt), async (req, res) => {
  const recipe = new Recipe(req.body);
  await recipe.save();
  res.send(recipe).status(200);
});
recipesRouter.get("/", async (req, res) => {
  const recipes = await Recipe.find().populate("categories ingredients");
  res.send(recipes).status(200);
});
recipesRouter.get("/:id", async (req, res) => {
  const recipes = await Recipe.findById(req.params.id).populate("categories ingredients");
  res.send(recipes).status(200);
});
recipesRouter.put("/:id", expressjwt(jwt), async (req, res) => {
  const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(updatedRecipe).status(200);
});
recipesRouter.delete("/:id", expressjwt(jwt), async (req, res) => {
  const recipes = await Recipe.findByIdAndDelete(req.params.id);
  res.send(recipes).status(200);
});
recipesRouter.post("/hide", async (req, res) => {
  res.status(500);
  res.send("Not implemented");
});
