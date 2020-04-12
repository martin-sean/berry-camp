import * as Knex from "knex";

const tableName = 'nickname_suggestion';

export async function up(knex: Knex): Promise<any> {
  knex.schema.createTable(tableName, (table) => {
    table
      .increments();
    table
      .integer('account_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('account')
      .index();
    table
      .integer('room_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('room')
      .index();
    table
      .string('nickname', 24)
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable(tableName);
}