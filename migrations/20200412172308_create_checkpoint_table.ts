import * as Knex from "knex";

const tableName = 'checkpoint';

export async function up(knex: Knex): Promise<any> {
  knex.schema.createTable(tableName, (table) => {
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
      .string('name', 24)
      .notNullable()
      .index();
    table
      .timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable(tableName);
}