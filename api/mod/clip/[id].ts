import { chain } from '@amaurym/now-middleware';
import { VercelRequest, VercelResponse } from "@vercel/node";
import cors from 'cors';
import isAuth from '../../../src/api/middleware/isAuth';
import isMod from '../../../src/api/middleware/isMod';
import { modDeleteClipById } from '../../../src/api/actions/clip';
import { connectToDatabase } from '../../../src/api/utils/database';
import { corsOptions } from '../../../src/api/utils/cors';

const handler = async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  const knex = connectToDatabase();
  
  const id: string | string[] = req.query.id;

  try {
    if (isNaN(id as any) || Array.isArray(id)) {
      throw new Error("id must be a number");
    }
    
    modDeleteClipById(parseInt(id), knex);
    res.status(200).send({});
  } catch (error) {
    console.error(error.message);
    res.status(400).send({});
  }

  knex.destroy();
}

export default chain(cors(corsOptions), isAuth, isMod)(handler)