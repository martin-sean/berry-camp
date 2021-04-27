import { VercelRequest, VercelResponse } from "@vercel/node";
import Account from "../../../src/api/data/models/Account";
import { connectToDatabase } from "../../../src/api/utils/database";

export default async (req: VercelRequest, res: VercelResponse) => {
  const knex = connectToDatabase();
 
  let username: string | string[] = req.query.username;
  if (Array.isArray(username)) {
    username = username[0];
  }

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