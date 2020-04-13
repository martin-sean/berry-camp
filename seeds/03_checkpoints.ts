import * as Knex from 'knex';

const tableName = 'checkpoint';

exports.seed = async (knex: Knex) => {
  // Deletes ALL existing entries
  await knex(tableName).del();
  // Inserts seed entries
  return knex(tableName).insert([
    // Chapter 9
    { id: 1, side_id: 1, name: 'Start', abbreviation: 'ST' },
    { id: 2, side_id: 1, name: 'Singular', abbreviation: 'SI' },
    { id: 3, side_id: 1, name: 'Power Source', abbreviation: 'PS' },
    { id: 4, side_id: 1, name: 'Remembered', abbreviation: 'RM' },
    { id: 5, side_id: 1, name: 'Event Horizon', abbreviation: 'EH' },
    { id: 6, side_id: 1, name: 'Determination', abbreviation: 'DT' },
    { id: 7, side_id: 1, name: 'Stubbornness', abbreviation: 'SB' },
    { id: 8, side_id: 1, name: 'Reconciliation', abbreviation: 'RC' },
    { id: 9, side_id: 1, name: 'Farewell', abbreviation: 'FW' },
  ]);
}
