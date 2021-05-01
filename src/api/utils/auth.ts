import { sign } from 'jsonwebtoken';
import Account from '../data/models/Account';
import { VercelResponse } from '@vercel/node';

const refreshTokenName = 'rid';

export interface AccessToken {
  userId: number;
  username: string;
  moderator: boolean;
}

export interface RefreshToken {
  userId: number;
}

export const createAccessToken = (account: Account) => {
  return sign(
    { userId: account.id, username: account.username, moderator: account.moderator },
    process.env.JWT_SECRET!,
    { expiresIn: '15m' },      
  );
}

const createRefreshToken = (account: Account) => {
  return sign(
    { userId: account.id },
    process.env.RT_SECRET!,
    { expiresIn: '7d' },
  )
}

export const setRefreshToken = (res: VercelResponse, account: Account): void => {
  res.status(200).setHeader('Set-Cookie', `${refreshTokenName}=${createRefreshToken(account)}; Expires=${new Date(Date.now() + (7 * 24 * 60 * 60 * 1000))}; Secure; HttpOnly; SameSite:Strict`)
}

export const clearRefreshToken = (res: VercelResponse): void => {
  res.status(200).setHeader('Set-Cookie', `${refreshTokenName}=deleted; Expires=${new Date(0)}`);
}