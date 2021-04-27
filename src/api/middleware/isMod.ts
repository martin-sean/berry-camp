import { Request, Response, NextFunction } from 'express';

// Check if account is a moderator and can access the protected function
export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const isMod: boolean = (res as any).locals.isMod;
  if (isMod) {
    next();
  } else {
    res.status(400).send({});
  }
}