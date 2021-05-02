import { chain, NowFunction } from '@amaurym/now-middleware';
import { VercelRequest, VercelResponse } from "@vercel/node";
import Clip from '../../../src/api/data/models/Clip';
import { cors } from '../../../src/api/middleware/cors';
import isAuth from '../../../src/api/middleware/isAuth';
import {connectToDatabase} from '../../../src/api/utils/database';
import {UpdateClipData, updateClipDataValid} from '../../../src/api/data/request/clip';
import { updateClip, deleteClipById } from '../../../src/api/actions/clip';

export default (req: VercelRequest, res: VercelResponse): NowFunction<VercelRequest, VercelResponse> => {
  switch (req.method) {
    case 'GET':
      return () => getClipRequest(req, res);
    case 'PUT':
      return () => editClipRequest(req, res);
    case 'DELETE':
      return () => deleteClipRequest(req, res);
  }

  throw new Error('bad method');
}

/**
 * Get a clip by id
 */
const getClipRequest = chain(cors)(async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  const knex = connectToDatabase();

  const id: string | string[] = req.query.id;
  try {
    if (isNaN(id as any)) throw new Error("id must be a number");

    const clip = await Clip.query(knex)
      .select(
        'clip.chapter_id',
        'clip.side_no',
        'clip.checkpoint_no',
        'clip.room_no',
        'clip.video_id',
        'clip.start_time',
        'clip.end_time',
        'clip.name',
        'clip.description',
        'clip.created_at'
      )
      .findById(id)
      .withGraphJoined('tags(tagSelect)')
      .withGraphJoined('author(authorSelect)')
      .withGraphJoined('likes')
      .modifiers({
        tagSelect: builder => {
          builder.select('tag.name');
        },
        authorSelect: builder => {
          builder.select('account.username');
        },
        likeSelect: builder => {
          builder.select('account.username')
        }
      });
    res.status(200).json(clip);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({});
  }

  knex.destroy();
});


/**
 * Edit existing clip
 */
 const editClipRequest = chain(cors, isAuth)(async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  const id: string | string[] = req.query.id;
  const userId: number = (res as any).locals.userId;
  const data: UpdateClipData = req.body;
  const updateTags = req.query.updateTags as string;
  // Validate update clip data
  if(!updateClipDataValid(data)) {
    res.status(400).send({});
    return;
  } 
  try {
    const knex = connectToDatabase();
    if (isNaN(id as any)) throw new Error("id must be a number");
    await updateClip(parseInt(id as string), userId, data, updateTags === 'true', knex);
    res.status(200).send({});
    knex.destroy();
  } catch (error) {
    console.log(error.message);
    res.status(400).send({});
  }
});

// Delete a clip for a given id
const deleteClipRequest = chain(cors, isAuth)(async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  const id: string | string[] = req.query.id;
  const userId: number = (res as any).locals.userId;

  try {
    if (isNaN(id as any)) throw new Error("Can't delete clip, id must be a number");
    await Clip.transaction(async (trx) => {
      await deleteClipById(parseInt(id as string), userId, trx);
    });
    res.status(200).send({});
  } catch (error) {
    console.error(error.message);
    res.status(400).send({});
  }
});
