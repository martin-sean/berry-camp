import * as Knex from "knex";

const tableName = 'clip';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(tableName, (table) => {
    table
      .increments();
    table
      .integer('account_id')
      .unsigned()
      .references('id')
      .inTable('account')
      .onDelete('SET NULL')
      .index();
    table
      .string('video_id', 11)
      .notNullable()
      .index();
    table
      .integer('start')
      .unsigned()
      .notNullable();
    table
      .integer('end')
      .unsigned()
      .notNullable();
    table
      .string('name', 24);
    table
      .string('description', 255);
    table
      .timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(tableName);
}