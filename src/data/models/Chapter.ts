import { Model } from 'objection';
import Side from './Side';
import Checkpoint from './Checkpoint';
import Room from './Room';

export default class Chapter extends Model {
  id!: number;
  chapter_no?: number;
  name!: string;
  offical!: boolean;

  static tableName = 'chapter';

  static jsonSchema = {
    type: 'object',
    required: ['name', 'official'],
    properties: {
      id: { type: 'integer' },
      chapter_no: { type: 'integer' },
      name: { type: 'string', minLength: 1, maxLength: 24 },
      offical: { type: 'boolean' },
    }
  }

  static relationMappings = () => ({
    // Sides that belong to this chapter
    sides: {
      relation: Model.HasManyRelation,
      modelClass: Side,
      join: {
        from: 'chapter.id',
        to: 'side.chapter_id',
      },
    },
    // Checkpoints that belong to this chapter
    checkpoints: {
      relation: Model.HasManyRelation,
      modelClass: Checkpoint,
      join: {
        from: 'chapter.id',
        through: {
          from: 'side.chapter_id',
          to: 'side.id',
        },
        to: 'checkpoint.side_id',
      },
    },
    // Rooms that belong to this chapter
    rooms: {
      relation: Model.HasManyRelation,
      modelClass: Room,
      join: {
        from: 'chapter.id',
        through: {
          from: 'side.chapter_id',
          through: {
            from: 'side.id',
            to: 'checkpoint.side_id',
          },
          to: 'checkpoint.id',
        },
        to: 'room.checkpoint_id',
      },
    },
  });

}