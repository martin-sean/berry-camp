import { Request, Response, NextFunction } from "express"

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "https://www.berrycamp.com/");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Accept, Content-Length, Content-Type")
  next();
}
