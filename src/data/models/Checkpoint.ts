import { Model } from 'objection';
import Chapter from './Chapter';
import Room from './Room';

export default class Checkpoint extends Model {
  id!: number;
  chapter_id!: number;
  name!: string;

  static tableName = 'checkpoint';

  static jsonSchema = {
    type: 'object',
    required: ['chapter_id', 'name'],
    properties: {
      id: { type: 'integer' },
      chapter_id: { type: 'integer' },
      name: { type: 'string', minLength: 1, maxLength: 24 },
    },
  }

  static relationMappings = () => ({
    // Chapter this checkpoint belongs to
    chapter: {
      relation: Model.BelongsToOneRelation,
      modelClass: Chapter,
      join: {
        from: 'checkpoint.chapter_id',
        to: 'chapter.id',
      },
    },
    // Rooms this checkpoint has
    rooms: {
      relation: Model.HasManyRelation,
      modelClass: Room,
      join: {
        from: 'checkpoint.id',
        to: 'room.checkpoint_id',
      },
    },
  });

}