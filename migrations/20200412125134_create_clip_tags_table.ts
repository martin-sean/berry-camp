import * as Knex from "knex";

const tableName = 'clip_tags'

export async function up(knex: Knex): Promise<any> {
  knex.schema.createTable(tableName, (table) => {
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
      .integer('tag_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('tag')
      .index();
    table
      .timestamps(true, true);
  })
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable(tableName);
}