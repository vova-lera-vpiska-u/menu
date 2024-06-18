import express from "express";
import { recipesRouter } from "./routes/recipes.js";
import db from "./mongo.js";
import Recipe from "./models/recipe.js";

const app = express();

app.get("/p", async (req, res) => {
  const recipe = new Recipe({
    name: "test",
  });
  const results = await recipe.save();
  res.send(results).status(200);
});

app.get("/", async (req, res) => {
  const resipe = await Recipe.find();
  res.send(resipe).status(200);
});

app.use("/recipes", recipesRouter);

export default app;
