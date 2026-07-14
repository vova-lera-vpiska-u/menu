import express from "express";
import { type Request as JWTRequest } from "express-jwt";
import { requireAuth } from "../jwt.ts";
import { db } from "../db/db.ts";

export const sectionsRouter = express.Router();

sectionsRouter.post(
  "/",
  requireAuth,
  async (req: JWTRequest, res: express.Response, next: express.NextFunction) => {
    try {
      const newCategory = req.body;

      // Insert into Supabase
      const { data, error } = await db.from("categories").insert(newCategory).select();

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
);
