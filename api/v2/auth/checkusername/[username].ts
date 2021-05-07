import { chain } from '@amaurym/now-middleware';
import { VercelRequest, VercelResponse } from '@vercel/node';
import Knex from 'knex';
import Account from '../../../../src/api/data/models/Account';
import isAuth from './../../../../src/api/middleware/isAuth';
import { initialiseKnex } from '../../../../src/api/utils/database';
import { cors } from '../../../../src/api/middleware/cors';

const handler = async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  const username: string | string[] = req.query.username;
  try {
    const knex: Knex = initialiseKnex();
    
    const account = await Account.query(knex)
      .select('username', 'moderator', 'created_at')
      .findOne('username', username);

    res.status(200).json({ available: !Boolean(account) });
    knex.destroy();
  } catch (error) {
    console.log(error.message);
    res.status(422).send(undefined);
   }
}

export default chain(cors, isAuth)(handler);

