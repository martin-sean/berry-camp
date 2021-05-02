import { chain } from '@amaurym/now-middleware';
import { VercelRequest, VercelResponse } from '@vercel/node';
import Account from '../../../../src/api/data/models/Account';
import isAuth from './../../../../src/api/middleware/isAuth';
import { connectToDatabase } from '../../../../src/api/utils/database';
import { cors } from '../../../../src/api/middleware/cors';

const knex = connectToDatabase();

const handler = async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  const username: string | string[] = req.query.username;
  try {
    const account = await Account.query(knex)
      .select('username', 'moderator', 'created_at')
      .findOne('username', username);

    res.status(200).json({ available: !Boolean(account) });
  } catch (error) {
    console.log(error.message);
    res.status(422).send(undefined);
   }

   knex.destroy();
}

export default chain(cors, isAuth)(handler);

