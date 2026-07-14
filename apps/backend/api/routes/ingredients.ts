import express from "express";
import { requireAuth } from "../jwt.ts";
import { db } from "../db/db.ts";
import type { TablesInsert } from "@menu/db";

export const ingredientsRouter = express.Router();

ingredientsRouter.post(
  "/",
  requireAuth,
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const newIngredient: TablesInsert<"ingredients"> = req.body;

      // Insert ingredient into Supabase
      const { data, error } = await db.from("ingredients").insert(newIngredient).select();

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      // Return the inserted row
      res.status(201).json(data[0]);
    } catch (err) {
      next(err);
    }
  }
);
