import { VercelRequest, VercelResponse } from "@vercel/node";
import { clearRefreshToken } from "../../src/api/utils/auth";

export default async (req: VercelRequest, res: VercelResponse) => {
  return clearRefreshToken(res);
}