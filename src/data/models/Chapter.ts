import { Model } from 'objection';
import Checkpoint from './Checkpoint';
import Room from './Room';

export default class Chapter extends Model {
  id!: number;
  name!: string;

  static tableName = 'chapter';

  static jsonSchema = {
    type: 'object',
    required: ['name'],
    properties: {
      id: { type: 'integer' },
      video_id: { type: 'string', minLength: 1, maxLength: 24 },
    }
  }

  static relationMappings = () => ({
    // Checkpoints that belong to this chapter
    checkpoints: {
      relation: Model.HasManyRelation,
      modelClass: Checkpoint,
      join: {
        from: 'chapter.id',
        to: 'checkpoint.chapter_id',
      },
    },
    // Rooms that belong to this chapter
    rooms: {
      relation: Model.HasManyRelation,
      modelClass: Room,
      join: {
        from: 'chapter.id',
        through: {
          from: 'checkpoint.chapter_id',
          to: 'checkpoint.id',
        },
        to: 'room.checkpoint_id',
      },
    },
  });

}