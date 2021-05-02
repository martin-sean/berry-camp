import { chain, NowFunction } from "@amaurym/now-middleware";
import { VercelRequest, VercelResponse } from "@vercel/node";
import Clip from "../../../src/api/data/models/Clip";
import { cors } from "../../../src/api/middleware/cors";
import isAuth from "../../../src/api/middleware/isAuth";
import { connectToDatabase } from "../../../src/api/utils/database";

export default (req: VercelRequest, res: VercelResponse): NowFunction<VercelRequest, VercelResponse> => {
  switch (req.method) {
    case 'POST':
      return likeClipRequest;
    case 'DELETE':
      return unlikeClipRequest;
  }
  
  throw new Error('bad method');
}

// Like a clip
const likeClipRequest = chain(cors, isAuth)(async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  const id: string | string[] = req.query.id;
  const userId: number = (res as any).locals.userId;

  try {
    if (isNaN(id as any)) throw new Error("Can't like, clip id must be a number");
    
    const knex = connectToDatabase();
    await Clip.relatedQuery('likes', knex).for(id).relate(userId);
    res.status(200).send({});
    knex.destroy();
  } catch (error) {
    console.error(error.message);
    res.status(400).send({});
  }
});

// Unlike a clip
const unlikeClipRequest = chain(cors, isAuth)(async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  const id: string | string[] = req.query.id;
  const userId: number = (res as any).locals.userId;

  try {
    if (isNaN(id as any)) throw new Error("Can't unlike, clip id must be a number");

    const knex = connectToDatabase();
    await Clip.relatedQuery('likes', knex).for(id).unrelate().where('account_id', userId);
    res.status(200).send({});
    knex.destroy();
  } catch (error) {
    console.error(error.message);
    res.status(400).send({});
  }
});

const handlers: Record<string, NowFunction<VercelRequest, VercelResponse>> = {
  'POST': likeClipRequest,
  'DELETE': unlikeClipRequest,
}