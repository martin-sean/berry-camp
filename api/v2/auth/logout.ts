import { chain } from "@amaurym/now-middleware";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { cors } from "../../../src/api/middleware/cors";
import { clearRefreshToken } from "../../../src/api/utils/auth";

const handler = async (req: VercelRequest, res: VercelResponse): void => {
  clearRefreshToken(res);
  res.send({});
}

export default chain(cors)(handler);