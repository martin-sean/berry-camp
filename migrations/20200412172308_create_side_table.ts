import * as Knex from "./knex";

const tableName = 'side';

exports.up = (knex: Knex): Promise<any> => {
  return knex.schema.createTable(tableName, (table) => {
    table
      .increments();
    table
      .integer('chapter_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('chapter')
      .index();
    table
      .string('name', 12)
      .index();
    table
      .boolean('official')
      .notNullable()
      .index();
    table
      .timestamps(true, true);
  });
}

exports.down = (knex: Knex): Promise<any> => {
  return knex.schema.dropTable(tableName);
}