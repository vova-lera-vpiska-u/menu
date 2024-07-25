import { Router } from "express";
import { Section } from "../models/section.js";
import { Recipe } from "../models/recipe.js";
import { expressjwt } from "express-jwt";
import { jwt } from "../jwt.js";

export const sectionsRouter = new Router();
sectionsRouter.get("/", async (req, res) => {
  const sections = await Section.find();
  res.send(sections).status(200);
});
sectionsRouter.get("/:name", async (req, res) => {
  //find section with name and return it and its recipes and recipe's category and ingredients
  const sections = await Section.findOne({ name: req.params.name });
  const recipes = await Recipe.find({ _id: { $in: sections.recipes } }).populate("categories ingredients");
  res.send(recipes).status(200);
});
sectionsRouter.post("/", expressjwt(jwt), async (req, res) => {
  const section = new Section(req.body);
  await section.save();
  res.send(section).status(200);
});
