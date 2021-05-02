import { chain } from '@amaurym/now-middleware';
import { VercelRequest, VercelResponse } from "@vercel/node";
import isAuth from '../../../../src/api/middleware/isAuth';
import isMod from '../../../../src/api/middleware/isMod';
import { modDeleteClipById } from '../../../../src/api/actions/clip';
import { connectToDatabase } from '../../../../src/api/utils/database';
import { cors } from '../../../../src/api/middleware/cors';

const handler = async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  const id: string | string[] = req.query.id;

  try {
    if (isNaN(id as any) || Array.isArray(id)) {
      throw new Error("id must be a number");
    }

    const knex = connectToDatabase();
    modDeleteClipById(parseInt(id), knex);
    res.status(200).send({});
    knex.destroy();
  } catch (error) {
    console.error(error.message);
    res.status(400).send({});
  }

}

export default chain(cors, isAuth, isMod)(handler)