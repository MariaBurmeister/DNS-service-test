import { Express, Request, Response } from "express";
import { lookup } from "./api/lookup";
import { api } from "./api";

export const routes = (app: Express) => {
  app.use("/", api);
  app.use("/lookup", lookup);
};
