import { chain } from '@amaurym/now-middleware';
import { VercelRequest, VercelResponse } from "@vercel/node";
import { raw } from 'objection';
import Clip from '../../src/api/data/models/Clip';
import isAuth from '../../src/api/middleware/isAuth';
import { connectToDatabase } from '../../src/api/utils/database';

const handler = async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  const knex = connectToDatabase();

  const userId: number = (res as any).locals.userId;
  try {
    let {chapterId, sideNo, checkpointNo, roomNo} = req.query;
    if (Array.isArray(chapterId) || Array.isArray(sideNo) || Array.isArray(checkpointNo) || Array.isArray(roomNo)) {
      console.error("Array found.");
      return;
    }

    if (sideNo !== undefined) {
      sideNo = parseInt(sideNo) as any;
    }

    if (roomNo !== undefined) {
      roomNo = parseInt(roomNo) as any;
    }

    const clips = await Clip.query(knex)
      .select(
        'clip.id',        
        'clip.name',
        'clip.description',
        'clip.video_id',
        'clip.start_time',
        'clip.end_time',
        'clip.created_at',
        // Count the number of lieks the clip has
        Clip.relatedQuery('likes', knex).count().as('likes'),
        // If a user id is provided, check if they like the current clip
        raw('exists ?', Clip.relatedQuery('likes', knex).select(1).where('account_clip_likes.account_id', userId)).as('userLikes')
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
  } catch (error) {
    console.log(error.message);
    res.status(400).send({});
  }

  knex.destroy();
}

export default chain(isAuth)(handler)