import { chain } from "@amaurym/now-middleware";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { verify } from "jsonwebtoken";
import { cors } from "../../../src/api/middleware/cors";
import Account from "../../../src/api/data/models/Account";
import { createAccessToken, RefreshToken } from "../../../src/api/utils/auth";
import { initialiseKnex } from '../../../src/api/utils/database';
import Knex from "knex";

const handler = async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  const refreshToken: string | undefined = req.cookies.rid;
  if (!refreshToken) {
    res.status(401).send({});
    return;
  }

  const knex: Knex = initialiseKnex();

  try {
    const payload: RefreshToken = verify(refreshToken, process.env.RT_SECRET!) as RefreshToken;
    const account = await Account.query(knex).findById(payload.userId);
    if (!account){
      throw new Error("Account could not be found");
    }

    res.status(200).send(createAccessToken(account));
    knex.destroy();
  } catch (error) {
    console.error(error);
    res.status(401).send({});
  }
}

export default chain(cors)(handler);