import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AccessToken } from '../utils/auth';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authorization = req.headers['authorization'];
  if (!authorization) {
    res.status(401).send({});
    return;
  }

  try {
    const token = authorization.split(" ")[1];
    const tokenData = verify(token, process.env.JWT_SECRET!) as AccessToken;
    res.locals.userId = tokenData.userId;
    res.locals.username = tokenData.username;
    res.locals.isMod = tokenData.moderator;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({});
  }
}