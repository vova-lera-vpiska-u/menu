import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jsonwebtoken from "jsonwebtoken";
import { type Request as JWTRequest } from "express-jwt";

import { recipesRouter } from "./routes/recipes.ts";
import { categoriesRouter } from "./routes/categories.ts";
import { sectionsRouter } from "./routes/sections.ts";
import { ingredientsRouter } from "./routes/ingredients.ts";
import { getPrivateKey, requireAuth } from "./jwt.ts";

const app = express();
const isVercel = process.env.VERCEL === "1" || false;

// Check private key at startup
if (!getPrivateKey()) {
  throw new Error("Missing token");
}

// Middleware
app.use(
  cors({
    origin: ["https://vova-lera-vpiska-u.github.io", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/files", express.static("files"));

// Routes
app.get("/", async (_req: express.Request, res: express.Response) => {
  res.status(200).send("ok");
});
app.use("/recipes", recipesRouter);
app.use("/categories", categoriesRouter);
app.use("/sections", sectionsRouter);
app.use("/ingredients", ingredientsRouter);

// Login route
app.post("/login", async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body as { username: string; password: string };
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (username === "admin" && password === adminPassword) {
    const token = jsonwebtoken.sign({ username, role: "admin" }, getPrivateKey(), { algorithm: "RS256", expiresIn: "24h" });

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

// Session restore route: verifies the httpOnly jwt cookie and returns the
// current user so the frontend can rehydrate auth state on page load.
app.get("/me", requireAuth, (req: JWTRequest, res: express.Response) => {
  const auth = req.auth;
  if (!auth || typeof auth === "string") {
    return res.status(401).send("Unauthorized");
  }
  return res.status(200).json({ username: auth.username, role: auth.role });
});

// Logout route
app.post("/logout", (_req: express.Request, res: express.Response) => {
  res
    .clearCookie("jwt", {
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
    })
    .status(200)
    .send("OK");
});

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Unauthorized");
  } else {
    next(err);
  }
});

// Start server if not running on Vercel
if (!isVercel) {
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Ready to cook on port ${port}`);
  });
}

export default app;
