import express from "express";
import { expressjwt, type Request as JWTRequest } from "express-jwt";
import { jwt } from "../jwt.ts";
import { put } from "@vercel/blob";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import multer, { type Multer } from "multer";

import { db } from "../db/db.ts"; // Supabase client
import { type TablesInsert, type TablesUpdate } from "../db/supabase.ts"; // Supabase types

// Multer setup for memory storage
const upload: Multer = multer({ storage: multer.memoryStorage() });

export const recipesRouter = express.Router();

// Extend Request to include file for multer
interface MulterRequest extends JWTRequest {
  file?: Express.Multer.File;
}

// POST /recipes
recipesRouter.post(
  "/",
  expressjwt({ secret: jwt.secret, algorithms: jwt.algorithms }),
  upload.single("image"),
  async (req: MulterRequest, res: express.Response, next: express.NextFunction) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Image file is required" });
      }

      const { name, category_id, rating, time_to_cook, recipe: recipeText, description } = req.body;

      // Upload image to Vercel Blob
      const blobFilename = `recipes/${uuidv4()}${path.extname(req.file.originalname)}`;
      const { url: cover_url } = await put(blobFilename, req.file.buffer, {
        access: "public",
        contentType: req.file.mimetype,
      });

      // Build insert object
      const newRecipe: TablesInsert<"food"> = {
        name,
        category_id,
        cover_url,
        rating: rating ? Number(rating) : null,
        time_to_cook: time_to_cook ? Number(time_to_cook) : null,
        recipe: recipeText || null,
        description: description || null,
      };

      // Insert into Supabase
      const { data, error } = await db.from("food").insert(newRecipe).select();

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      res.status(201).json(data[0]);
    } catch (err) {
      next(err);
    }
  }
);

// PUT /recipes/:id
recipesRouter.put(
  "/:id",
  expressjwt({ secret: jwt.secret, algorithms: jwt.algorithms }),
  async (req: JWTRequest, res: express.Response, next: express.NextFunction) => {
    try {
      const { id } = req.params;
      const updates: TablesUpdate<"food"> = req.body;

      const { data, error } = await db.from("food").update(updates).eq("id", id).select();

      if (error) return res.status(400).json({ error: error.message });

      res.status(200).json(data[0]);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /recipes/:id
recipesRouter.delete(
  "/:id",
  expressjwt({ secret: jwt.secret, algorithms: jwt.algorithms }),
  async (req: JWTRequest, res: express.Response, next: express.NextFunction) => {
    try {
      const { id } = req.params;

      const { data, error } = await db.from("food").delete().eq("id", id).select();

      if (error) return res.status(400).json({ error: error.message });

      res.status(200).json(data[0]);
    } catch (err) {
      next(err);
    }
  }
);

// POST /recipes/hide (Not implemented)
recipesRouter.post("/hide", async (_req: express.Request, res: express.Response) => {
  res.status(500).send("Not implemented");
});
