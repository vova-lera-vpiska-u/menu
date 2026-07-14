import express from "express";
import { type Request as JWTRequest } from "express-jwt";
import { requireAuth } from "../jwt.ts";
import { put } from "@vercel/blob";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import multer, { type Multer } from "multer";

import { db } from "../db/db.ts"; // Supabase client
import { type TablesInsert, type TablesUpdate } from "@menu/db"; // Supabase types

// Multer setup for memory storage
const upload: Multer = multer({ storage: multer.memoryStorage() });

export const recipesRouter = express.Router();

// Extend Request to include file for multer
interface MulterRequest extends JWTRequest {
  file?: Express.Multer.File;
}

// Parse a duration string like "3h", "20min", "1h 30min" into total minutes.
// Returns null if nothing parseable is found.
const parseTimeToCook = (raw: unknown): number | null => {
  if (raw === undefined || raw === null || raw === "") return null;
  const str = String(raw).trim();

  // Plain number → treat as minutes.
  if (/^\d+(\.\d+)?$/.test(str)) return Number(str);

  let minutes = 0;
  let matched = false;
  const hours = str.match(/(\d+(?:\.\d+)?)\s*h/i);
  if (hours) {
    minutes += Number(hours[1]) * 60;
    matched = true;
  }
  const mins = str.match(/(\d+(?:\.\d+)?)\s*m/i);
  if (mins) {
    minutes += Number(mins[1]);
    matched = true;
  }
  return matched ? minutes : null;
};

// Safely parse a numeric nutrition value ("250" | 250 | "") into number | null.
const toNumberOrNull = (raw: unknown): number | null => {
  if (raw === undefined || raw === null || raw === "") return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
};

// Safely JSON.parse, returning a fallback on any error.
const safeJsonParse = <T,>(raw: unknown, fallback: T): T => {
  if (typeof raw !== "string" || raw.trim() === "") return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

// Shape the frontend sends for each ingredient row.
type IngredientInput = {
  name?: unknown;
  amount?: unknown;
  unit?: unknown;
  optional?: unknown;
};

// Look up an ingredient by name (case-insensitive), creating it if missing.
// Returns the ingredient id, or null when the name is blank / the write fails.
const findOrCreateIngredient = async (rawName: unknown): Promise<string | null> => {
  const name = typeof rawName === "string" ? rawName.trim() : "";
  if (!name) return null;

  const { data: existing } = await db.from("ingredients").select("id").ilike("name", name).limit(1);
  if (existing && existing.length > 0) return existing[0].id;

  const { data: created, error } = await db.from("ingredients").insert({ name }).select("id");
  if (error || !created || created.length === 0) return null;
  return created[0].id;
};

// Insert food_ingredients rows for a recipe. Returns an error message or null.
const insertFoodIngredients = async (foodId: string, ingredients: IngredientInput[]): Promise<string | null> => {
  const rows: TablesInsert<"food_ingredients">[] = [];
  for (const item of ingredients) {
    if (!item) continue;
    const ingredientId = await findOrCreateIngredient(item.name);
    if (!ingredientId) continue;
    const unit = typeof item.unit === "string" && item.unit.trim() ? item.unit.trim() : null;
    // Preserve the order the user arranged rows in — position drives display order.
    rows.push({
      food_id: foodId,
      ingredient_id: ingredientId,
      amount: toNumberOrNull(item.amount),
      unit,
      optional: Boolean(item.optional),
      position: rows.length,
    });
  }
  if (rows.length === 0) return null;
  const { error } = await db.from("food_ingredients").insert(rows);
  return error ? error.message : null;
};

// POST /recipes
recipesRouter.post(
  "/",
  requireAuth,
  upload.single("image"),
  async (req: MulterRequest, res: express.Response, next: express.NextFunction) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Image file is required" });
      }

      // Frontend sends multipart/form-data:
      //   name, section (= categories.id), categories (JSON tags.id[]),
      //   image, timeToCook ("3h"/"20min"/"1h 30min"), rating, nutrition (JSON)
      const { name, section, rating, timeToCook, recipe: recipeText, description } = req.body;
      const tagIds = safeJsonParse<string[]>(req.body.categories, []);
      const ingredients = safeJsonParse<IngredientInput[]>(req.body.ingredients, []);
      const nutrition = safeJsonParse<{ calories?: unknown; protein?: unknown; fat?: unknown; carbs?: unknown }>(
        req.body.nutrition,
        {}
      );

      // Upload image to Vercel Blob
      const blobFilename = `recipes/${uuidv4()}${path.extname(req.file.originalname)}`;
      const { url: cover_url } = await put(blobFilename, req.file.buffer, {
        access: "public",
        contentType: req.file.mimetype,
      });

      // Build insert object
      const newRecipe: TablesInsert<"food"> = {
        name,
        category_id: section,
        cover_url,
        rating: toNumberOrNull(rating),
        time_to_cook: parseTimeToCook(timeToCook),
        recipe: recipeText || null,
        description: description || null,
        calories: toNumberOrNull(nutrition.calories),
        protein: toNumberOrNull(nutrition.protein),
        fat: toNumberOrNull(nutrition.fat),
        carbs: toNumberOrNull(nutrition.carbs),
      };

      // Insert into Supabase
      const { data, error } = await db.from("food").insert(newRecipe).select();

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      const created = data[0];

      // Link tags via the food_tags join table
      if (Array.isArray(tagIds) && tagIds.length > 0) {
        const tagRows: TablesInsert<"food_tags">[] = tagIds.map((tag_id) => ({
          food_id: created.id,
          tag_id,
        }));
        const { error: tagsError } = await db.from("food_tags").insert(tagRows);
        if (tagsError) {
          // Food was created; report partial failure so the client can retry the links.
          return res.status(207).json({ ...created, tagsError: tagsError.message });
        }
      }

      // Link ingredients via the food_ingredients join table
      if (Array.isArray(ingredients) && ingredients.length > 0) {
        const ingredientsError = await insertFoodIngredients(created.id, ingredients);
        if (ingredientsError) {
          return res.status(207).json({ ...created, ingredientsError });
        }
      }

      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  }
);

// PUT /recipes/:id
recipesRouter.put(
  "/:id",
  requireAuth,
  async (req: JWTRequest, res: express.Response, next: express.NextFunction) => {
    try {
      const { id } = req.params;
      const foodId = String(id);

      // `tags` and `ingredients` are not columns on food — pull them out and
      // sync the join tables separately so they aren't passed to the update.
      const { tags, ingredients, ...foodUpdates } = req.body;
      const updates: TablesUpdate<"food"> = foodUpdates;

      const { data, error } = await db.from("food").update(updates).eq("id", foodId).select();

      if (error) return res.status(400).json({ error: error.message });

      // Replace the whole tag set for this recipe when the client sends it.
      if (Array.isArray(tags)) {
        const { error: deleteError } = await db.from("food_tags").delete().eq("food_id", foodId);
        if (deleteError) return res.status(400).json({ error: deleteError.message });

        if (tags.length > 0) {
          const tagRows: TablesInsert<"food_tags">[] = tags.map((tag_id: string) => ({
            food_id: foodId,
            tag_id,
          }));
          const { error: insertError } = await db.from("food_tags").insert(tagRows);
          if (insertError) return res.status(400).json({ error: insertError.message });
        }
      }

      // Replace the whole ingredient set for this recipe when the client sends it.
      if (Array.isArray(ingredients)) {
        const { error: deleteError } = await db.from("food_ingredients").delete().eq("food_id", foodId);
        if (deleteError) return res.status(400).json({ error: deleteError.message });

        const ingredientsError = await insertFoodIngredients(foodId, ingredients);
        if (ingredientsError) return res.status(400).json({ error: ingredientsError });
      }

      res.status(200).json(data[0]);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /recipes/:id
recipesRouter.delete(
  "/:id",
  requireAuth,
  async (req: JWTRequest, res: express.Response, next: express.NextFunction) => {
    try {
      const { id } = req.params;
      const foodId = String(id);

      // Remove join-table rows first — they reference food(id) via foreign keys,
      // so deleting the food row directly would violate those constraints.
      const { error: tagsError } = await db.from("food_tags").delete().eq("food_id", foodId);
      if (tagsError) return res.status(400).json({ error: tagsError.message });

      const { error: ingredientsError } = await db.from("food_ingredients").delete().eq("food_id", foodId);
      if (ingredientsError) return res.status(400).json({ error: ingredientsError.message });

      const { data, error } = await db.from("food").delete().eq("id", foodId).select();

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
