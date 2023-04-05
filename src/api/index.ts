import express, { Request, Response } from "express";
import config from "config";
export const api = express.Router();

api.use(express.static("public"));

const fs = require("fs");

const page = (req: Request, res: Response) => {
  const filePath = config.get<string>("indexPath");
  console.log(filePath);
  const foundFile = fs.existsSync(filePath);
  console.log(foundFile);

  foundFile ? res.sendFile(filePath) : res.status(404).send("Page not found");
};

api.get("/", page);
