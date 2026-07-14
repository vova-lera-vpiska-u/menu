import express from "express";
import { requireAuth } from "../jwt.ts";
import { db } from "../db/db.ts";
import type { TablesInsert } from "../db/supabase.ts";

export const categoriesRouter = express.Router();

categoriesRouter.post(
  "/",
  requireAuth,
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const newCategory: TablesInsert<"tags"> = {
        name: req.body.name,
      };

      // Insert category into Supabase
      const { data, error } = await db.from("tags").insert(newCategory).select();

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      // Return the inserted category
      res.status(201).json(data[0]);
    } catch (err) {
      next(err);
    }
  }
);
