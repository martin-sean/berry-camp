import { chain } from '@amaurym/now-middleware';
import { VercelRequest, VercelResponse } from "@vercel/node";
import cors from 'cors';
import Clip from '../../src/api/data/models/Clip';
import isAuth from '../../src/api/middleware/isAuth';
import {connectToDatabase} from '../../src/api/utils/database';

const handler = async (req: VercelRequest, res: VercelResponse): Promise<void> => {
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
}

export default chain(cors, isAuth)(handler)