import * as Knex from 'knex';

const tableName = 'chapter';

exports.seed = async (knex: Knex) => {
  // Wipe all entries
  await knex('room').del();
  await knex('checkpoint').del();
  await knex('side').del();
  await knex(tableName).del();
  // Inserts seed entries
  return knex(tableName).insert([
    { id: 5, name: 'Prologue', official: true },
    { id: 10, chapter_no: 1, name: 'Forsaken City', official: true },
    { id: 20, chapter_no: 2, name: 'Old Site', official: true },
    { id: 30, chapter_no: 3, name: 'Celestial Resort', official: true },
    { id: 40, chapter_no: 4, name: 'Golden Ridge', official: true },
    { id: 50, chapter_no: 5, name: 'Mirror Temple', official: true },
    { id: 60, chapter_no: 6, name: 'Reflection', official: true },
    { id: 70, chapter_no: 7, name: 'The Summit', official: true },
    { id: 75, name: 'Epilogue', official: true },
    { id: 80, chapter_no: 8, name: 'Core', official: true },
    { id: 90, chapter_no: 9, name: 'Farewell', official: true },
  ]);
}