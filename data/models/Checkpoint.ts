import { Model } from 'objection';
import Side from './Side';
import Room from './Room';

export default class Checkpoint extends Model {
  id!: number;
  side_id!: number;
  name?: string;
  abbreviation?: string;

  static tableName = 'checkpoint';

  static jsonSchema = {
    type: 'object',
    required: ['side_id'],
    properties: {
      id: { type: 'integer' },
      side_id: { type: 'integer' },
      name: { type: 'string', minLength: 1, maxLength: 24 },
      abbreviation: { type: 'string', minLength: 1, maxLength: 3 },
    },
  }

  static relationMappings = () => ({
    // Side this checkpoint belongs to
    side: {
      relation: Model.BelongsToOneRelation,
      modelClass: Side,
      join: {
        from: 'checkpoint.side_id',
        to: 'side.id',
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