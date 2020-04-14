import { Model } from 'objection';
import Side from './Side';

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
  });

}