import { Model } from 'objection';
import Checkpoint from './Checkpoint';
import Chapter from './Chapter';

export default class Room extends Model {
  id!: number;
  checkpoint_id!: number;
  nickname!: string;

  static tableName = 'room';

  static jsonSchema = {
    type: 'object',
    required: ['checkpoint_id', 'nickname'],
    properties: {
      id: { type: 'integer' },
      checkpoint_id: { type: 'integer' },
      nickname: { type: 'string', minLength: 1, maxLength: 24 },
    }
  }

  static relationMappings = () => ({
    // Checkpoint this room belongs to
    checkpoint: {
      relation: Model.BelongsToOneRelation,
      modelClass: Checkpoint,
      join: {
        from: 'room.checkpoint_id',
        to: 'checkpoint.id',
      },
    },
    // Chapter this room belongs to
    chapter: {
      relation: Model.BelongsToOneRelation,
      modelClass: Chapter,
      join: {
        from: 'room.checkpoint_id',
        through: {
          from: 'checkpoint.id',
          to: 'checkpoint.chapter_id',
        },
        to: 'chapter.id',
      },
    },
  });

}