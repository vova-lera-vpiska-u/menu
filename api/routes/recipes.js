import { Router } from "express";
import { Recipe } from "../models/recipe.js";
import { expressjwt } from "express-jwt";
import { jwt } from "../jwt.js";
import { put } from "@vercel/blob";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import multer from "multer";
import { Section } from "../models/section.js";
import { Category } from "../models/category.js";

const upload = multer({ storage: multer.memoryStorage() });

export const recipesRouter = new Router();

recipesRouter.post("/", expressjwt(jwt), upload.single("image"), async (req, res) => {
  const file = req.file;
  const { name, section, categories, rating, timeToCook, nutrition } = req.body;
  const nutritionParsed = JSON.parse(nutrition);
  const categoriesParsed = JSON.parse(categories);

  const blobFilename = `recipes/${uuidv4()}${path.extname(file.originalname)}`;

  const { url: blobUrl } = await put(blobFilename, file.buffer, {
    access: "public",
    contentType: file.mimetype,
  });

  const recipe = new Recipe({
    name,
    section,
    categories: categoriesParsed,
    image: blobUrl,
    rating,
    timeToCook,
    nutrition: nutritionParsed,
  });
  await recipe.save();

  await Section.findOneAndUpdate({ _id: section }, { $push: { recipes: recipe._id } });
  await Category.updateMany({ _id: { $in: categoriesParsed } }, { $push: { recipes: recipe._id } });
  res.send(recipe).status(200);
});

recipesRouter.get("/", async (req, res) => {
  const { name } = req.query;
  const recipes = await Recipe.find(name ? { name: { $regex: name, $options: "i" } } : {}).populate(
    "categories ingredients section"
  );
  res.send(recipes).status(200);
});
recipesRouter.get("/:id", async (req, res) => {
  const recipes = await Recipe.findById(req.params.id).populate("categories ingredients section");
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
