import * as Knex from '../../migrations/knex';

const tableName = 'side';

exports.seed = async (knex: Knex) => {
  // Deletes ALL existing entries
  await knex(tableName).del();
  // Inserts seed entries
  return knex(tableName).insert([
    // Chapter 9
    { id: 1, chapter_id: 11, official: true },
  ]);
}