import express from "express";
import { recipesRouter } from "./routes/recipes.js";

const app = express();

app.use("/recipes", recipesRouter);

export default app;
