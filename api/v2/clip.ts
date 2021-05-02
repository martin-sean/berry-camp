import { chain, NowFunction } from "@amaurym/now-middleware";
import { VercelRequest, VercelResponse } from "@vercel/node";
import Knex from "knex";
import Clip from "../../src/api/data/models/Clip";
import {connectToDatabase} from '../../src/api/utils/database';
import {cors} from "../../src/api/middleware/cors";
import isAuth from "../../src/api/middleware/isAuth";
import { createClip } from '../../src/api/actions/clip';
import {clipDataValid, NewClipData} from '../../src/api/data/request/clip';

export default (req: VercelRequest, res: VercelResponse): NowFunction<VercelRequest, VercelResponse> => {
  switch (req.method) {
    case 'GET':
      return getClipsByRoomRequest;
    case 'POST':
      return createClipRequest;
  }

  throw new Error('bad method');
}

/**
 * Get clips by room for users not logged in
 */
const getClipsByRoomRequest = chain(cors)(async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  try {
    let {chapterId, sideNo, checkpointNo, roomNo} = req.query;
    if (Array.isArray(chapterId) || Array.isArray(sideNo) || Array.isArray(checkpointNo) || Array.isArray(roomNo)) {
      console.error("Array found.");
      res.status(400).send({});
      return;
    }

    if (sideNo !== undefined) {
      sideNo = parseInt(sideNo) as any;
    }

    if (roomNo !== undefined) {
      roomNo = parseInt(roomNo) as any;
    }

    const knex = connectToDatabase();

    const clips = await Clip.query(knex)
      .select(
        'clip.id',        
        'clip.name',
        'clip.description',
        'clip.video_id',
        'clip.start_time',
        'clip.end_time',
        'clip.created_at',
        // Count the number of likes the clip has
        Clip.relatedQuery('likes', knex).count().as('likes'),
      )
      // Get clip by values
      .skipUndefined()
      .where('clip.chapter_id', chapterId as any)
      .where('clip.side_no', sideNo as any)
      .where('clip.checkpoint_no', checkpointNo as any)
      .where('clip.room_no', roomNo as any)
      .withGraphJoined('tags(tagSelect)')
      .withGraphJoined('author(authorSelect)')
      .modifiers({
        tagSelect: builder => {
          builder.select('tag.name');
        },
        authorSelect: builder => {
          builder.select('account.username');
        },
      });
    res.status(200).json(clips);

    knex.destroy();
  } catch (error) {
    console.log(error.message);
    res.status(400).send({});
  }
});

// Create a new clip
const createClipRequest = chain(cors, isAuth)(async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  const userId: number = (res as any).locals.userId;
  const data: NewClipData = req.body;

  // Validate clip data
  if(!clipDataValid(data)) {
    res.status(400).send({});
    return;
  }

  try {
    const knex: Knex = connectToDatabase();
    createClip(data, userId, knex);
    res.status(200).send({});
    knex.destroy();
  } catch (error) {
    console.error(error.message);
    res.status(400).send({});
  }
});