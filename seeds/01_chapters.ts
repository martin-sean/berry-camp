import * as Knex from '../../migrations/knex';

const tableName = 'chapter';

exports.seed = async (knex: Knex) => {
  // Wipe all entries
  await knex('room').del();
  await knex('checkpoint').del();
  await knex('side').del();
  await knex(tableName).del();
  // Inserts seed entries
  return knex(tableName).insert([
    { id: 1, name: 'Prologue', official: true },
    { id: 2, chapter_no: 1, name: 'Forsaken City', official: true },
    { id: 3, chapter_no: 2, name: 'Old Site', official: true },
    { id: 4, chapter_no: 3, name: 'Celestial Resort', official: true },
    { id: 5, chapter_no: 4, name: 'Golden Ridge', official: true },
    { id: 6, chapter_no: 5, name: 'Mirror Temple', official: true },
    { id: 7, chapter_no: 6, name: 'Reflection', official: true },
    { id: 8, chapter_no: 7, name: 'The Summit', official: true },
    { id: 9, name: 'Epilogue', official: true },
    { id: 10, chapter_no: 8, name: 'Core', official: true },
    { id: 11, chapter_no: 9, name: 'Farewell', official: true },
  ]);
}