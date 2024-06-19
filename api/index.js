import express from "express";
import { recipesRouter } from "./routes/recipes.js";
import { catagoriesRouter } from "./routes/categories.js";
import cors from "cors";
import { connectMongo } from "./mongo.js";
import { sectionsRouter } from "./routes/sections.js";
import { ingredientsRouter } from "./routes/ingredients.js";

const app = express();
const isVercel = process.env.VERCEL || false;

app.use(cors());
app.use(express.json());
connectMongo();
app.get("/", async (req, res) => {
  res.send("ok").status(200);
});
app.use("/recipes", recipesRouter);
app.use("/categories", catagoriesRouter);
app.use("/sections", sectionsRouter);
app.use("/ingredients", ingredientsRouter);

if (!isVercel) {
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log("Ready to cook on port " + port);
  });
}

export default app;
