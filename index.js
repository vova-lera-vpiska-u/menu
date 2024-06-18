import express from "express";
import { recipesRouter } from "./routes/recipes.js";

const app = express();
const port = process.env.PORT || 8000;

app.use("/recipes", recipesRouter);

app.listen(port, () => {
  console.log(`Ready to cook on ${port}`);
});
