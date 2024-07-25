import express from "express";
import { recipesRouter } from "./routes/recipes.js";
import { catagoriesRouter } from "./routes/categories.js";
import cors from "cors";
import { connectMongo } from "./mongo.js";
import { sectionsRouter } from "./routes/sections.js";
import { ingredientsRouter } from "./routes/ingredients.js";
import jsonwebtoken from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { getPrivateKey } from "./jwt.js";

const app = express();
const isVercel = process.env.VERCEL || false;

if (!getPrivateKey()) {
  throw new Error("Missing token");
}
app.use(
  cors({
    origin: ["https://vova-lera-vpiska-u.github.io", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

connectMongo();
app.get("/", async (req, res) => {
  res.send("ok").status(200);
});
app.use("/recipes", recipesRouter);
app.use("/categories", catagoriesRouter);
app.use("/sections", sectionsRouter);
app.use("/ingredients", ingredientsRouter);

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "J787fi90S") {
    const token = jsonwebtoken.sign(
      { username, role: "admin" },
      getPrivateKey(),
      { algorithm: "RS256" },
      {
        expiresIn: "24h",
      }
    );
    return res
      .cookie("jwt", token, {
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        sameSite: "none",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .send("");
  }
  res.status(401).send("Unauthorized");
});
app.post("/logout", (req, res) => {
  res
    .clearCookie("jwt", {
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
    })
    .status(200)
    .send("OK");
});

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Unauthorized");
  } else {
    next(err);
  }
});

if (!isVercel) {
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log("Ready to cook on port " + port);
  });
}

export default app;
