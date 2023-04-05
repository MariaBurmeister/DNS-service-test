import { Request, Response, NextFunction, Router } from "express";
import { isManagedByUs, getQTypeResponse } from "../../fakeDB";
export const lookup = Router();

lookup.get("/", (req: Request, res: Response) => {});

lookup.param(
  "qName",
  (req: Request, res: Response, next: NextFunction, qName) => {
    if (isManagedByUs(qName)) {
      next();
    } else {
      res.status(404).json({ result: false });
      res.end();
    }
  }
);

lookup.param(
  "qType",
  (req: Request, res: Response, next: NextFunction, qType) => {
    const { qName } = req.params;
    try {
      const response = getQTypeResponse(qName, qType);
      res.status(200).json(response);
    } catch (e: any) {
      res.status(400).send(e.message);
    }
    next();
  }
);

lookup.get("/:qName/:qType", (req: Request, res: Response) => {
  res.end();
});
