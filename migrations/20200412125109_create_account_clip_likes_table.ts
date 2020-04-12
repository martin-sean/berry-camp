import * as Knex from "knex";

const tableName = 'account_clip_likes';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(tableName, (table) => {
    table
      .increments();
    table
      .integer('clip_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('clip')
      .index();
    table
      .integer('account_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('account')
      .index();
    table
      .timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(tableName);
}