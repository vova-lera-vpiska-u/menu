import { Router } from "express";
import { Category } from "../models/category.js";
import { expressjwt } from "express-jwt";
import { jwt } from "../jwt.js";

export const catagoriesRouter = new Router();
catagoriesRouter.get("/", async (req, res) => {
  const categories = await Category.find();
  res.send(categories).status(200);
});
catagoriesRouter.post("/", expressjwt(jwt), async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });
  await category.save();
  res.send(category).status(200);
});
