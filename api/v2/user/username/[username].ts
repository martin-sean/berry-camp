import { chain } from "@amaurym/now-middleware";
import { VercelRequest, VercelResponse } from "@vercel/node";
import Knex from "knex";
import Account from "../../../../src/api/data/models/Account";
import { cors } from "../../../../src/api/middleware/cors";
import { initialiseKnex } from "../../../../src/api/utils/database";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  let username: string | string[] = req.query.username;
  if (Array.isArray(username)) {
    username = username[0];
  }

  const knex: Knex = initialiseKnex();
  const account = await Account.query(knex)
    .select('username', 'moderator', 'created_at')
    .findOne('username', '=', username);
  if (account) {
    res.status(200).json(account);
  } else {
    res.status(404).send({});
  }
  knex.destroy();
};

export default chain(cors)(handler);