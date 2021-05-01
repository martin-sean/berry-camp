import { chain } from "@amaurym/now-middleware";
import { VercelRequest, VercelResponse } from "@vercel/node";
import cors from 'cors';
import { clearRefreshToken } from "../../src/api/utils/auth";
import { corsOptions } from "../../src/api/utils/cors";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  return clearRefreshToken(res);
}

export default chain(cors(corsOptions))(handler);