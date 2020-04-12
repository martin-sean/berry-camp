import * as Knex from "knex";

const tableName = 'nickname_suggestion_likes';

export async function up(knex: Knex): Promise<any> {
  knex.schema.createTable(tableName, (table) => {
    table
      .increments();
    table
      .integer('name_suggestion_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('name_suggestion')
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
  knex.schema.dropTable(tableName);
}