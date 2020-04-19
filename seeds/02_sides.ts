import * as Knex from 'knex';

const tableName = 'side';

exports.seed = async (knex: Knex) => {
  // Deletes ALL existing entries
  await knex(tableName).del();
  // Inserts seed entries
  return knex(tableName).insert([
    // Prologue
    { id: 1, chapter_id: 5, side_no: 1, official: true },

    // Chapter 1
    { id: 10, name: 'A', chapter_id: 10, side_no: 1, official: true },
    { id: 11, name: 'B', chapter_id: 10, side_no: 2, official: true },
    { id: 12, name: 'C', chapter_id: 10, side_no: 3, official: true },

    // Chapter 2
    { id: 20, name: 'A', chapter_id: 20, side_no: 1, official: true },
    { id: 21, name: 'B', chapter_id: 20, side_no: 2, official: true },
    { id: 22, name: 'C', chapter_id: 20, side_no: 3, official: true },

    // Chapter 3
    { id: 30, name: 'A', chapter_id: 30, side_no: 1, official: true },
    { id: 31, name: 'B', chapter_id: 30, side_no: 2, official: true },
    { id: 32, name: 'C', chapter_id: 30, side_no: 3, official: true },
    
    // Chapter 4
    { id: 40, name: 'A', chapter_id: 40, side_no: 1, official: true },
    { id: 41, name: 'B', chapter_id: 40, side_no: 2, official: true },
    { id: 42, name: 'C', chapter_id: 40, side_no: 3, official: true },
    
    // Chapter 5
    { id: 50, name: 'A', chapter_id: 50, side_no: 1, official: true },
    { id: 51, name: 'B', chapter_id: 50, side_no: 2, official: true },
    { id: 52, name: 'C', chapter_id: 50, side_no: 3, official: true },
    
    // Chapter 6
    { id: 60, name: 'A', chapter_id: 60, side_no: 1, official: true },
    { id: 61, name: 'B', chapter_id: 60, side_no: 2, official: true },
    { id: 62, name: 'C', chapter_id: 60, side_no: 3, official: true },
    
    // Chapter 7
    { id: 70, name: 'A', chapter_id: 70, side_no: 1, official: true },
    { id: 71, name: 'B', chapter_id: 70, side_no: 2, official: true },
    { id: 72, name: 'C', chapter_id: 70, side_no: 3, official: true },

    // Epilogue
    { id: 75, chapter_id: 75, side_no: 1, official: true },

    // Chapter 8
    { id: 80, name: 'A', chapter_id: 80, side_no: 1, official: true },
    { id: 81, name: 'B', chapter_id: 80, side_no: 2, official: true },
    { id: 82, name: 'C', chapter_id: 80, side_no: 3, official: true },

    // Chapter 9
    { id: 90, chapter_id: 90, side_no: 1, official: true },
  ]);
}