import { Model } from 'objection';
import Chapter from './Chapter';
import Side from './Side';
import Checkpoint from './Checkpoint';

export default class Room extends Model {
  id!: number;
  debug_id!: string;
  room_number!: number;
  checkpoint_id!: number;
  nickname?: string;

  static tableName = 'room';

  static jsonSchema = {
    type: 'object',
    required: ['debug_id', 'room_number', 'checkpoint_id'],
    properties: {
      id: { type: 'integer' },
      debug_id: { type: 'string', minLength: 1, maxLength: 16 },
      room_number: { type: 'integer '},
      checkpoint_id: { type: 'integer' },
      nickname: { type: 'string', minLength: 1, maxLength: 24 },
    }
  }

  static relationMappings = () => ({
    // Chapter this room belongs to
    chapter: {
      relation: Model.BelongsToOneRelation,
      modelClass: Chapter,
      join: {
        from: 'room.checkpoint_id',
        through: {
          from: 'checkpoint.id',
          through: {
            from: 'checkpoint.side_id',
            to: 'side.id',
          },
          to: 'side.chapter_id',
        },
        to: 'chapter.id',
      },
    },
    // Side this room belongs to
    side: {
      relation: Model.BelongsToOneRelation,
      modelClass: Side,
      join: {
        from: 'room.checkpoint_id',
        through: {
          from: 'checkpoint.id',
          to: 'checkpoint.side_id',
        },
        to: 'side.id',
      },
    },
    // Checkpoint this room belongs to
    checkpoint: {
      relation: Model.BelongsToOneRelation,
      modelClass: Checkpoint,
      join: {
        from: 'room.checkpoint_id',
        to: 'checkpoint.id',
      },
    },
  });

}