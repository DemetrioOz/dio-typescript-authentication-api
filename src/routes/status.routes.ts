import { Router, Request, Response, NextFunction } from "express";
import statusCode from "http-status-codes";

const status = Router();

status.get("/status", (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(statusCode.OK);
});

export default status;
