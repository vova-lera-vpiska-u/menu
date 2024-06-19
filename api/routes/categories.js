import { Router } from "express";
import { Category } from "../models/category.js";

export const catagoriesRouter = new Router();
catagoriesRouter.get("/", async (req, res) => {
  const categories = await Category.find();
  res.send(categories).status(200);
});
catagoriesRouter.post("/", async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });
  await category.save();
  res.send(category).status(200);
});
