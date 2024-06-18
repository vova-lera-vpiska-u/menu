import { Router } from "express";

export const recipesRouter = new Router();
recipesRouter.get("/", (req, res) => {
  console.log("getAll", req.body);
  res.status(500);
  res.send("Not implemented");
});
recipesRouter.post("/", (req, res) => {
  console.log("add", req.body);
  res.status(500);
  res.send("Not implemented");
});
recipesRouter.post("/hide", (req, res) => {
  console.log("hide", req.body);
  res.status(500);
  res.send("Not implemented");
});
