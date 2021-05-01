import { chain } from "@amaurym/now-middleware";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { clearRefreshToken } from "../../src/api/utils/auth";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  return clearRefreshToken(res);
}

export default chain()(handler);