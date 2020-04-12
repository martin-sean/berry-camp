import * as Knex from "knex";

const tableName = 'room';

export async function up(knex: Knex): Promise<any> {
  knex.schema.createTable(tableName, (table) => {
    table
      .increments();
    table
      .string('debug_id', 24)
      .notNullable()
      .index();
    table
      .integer('room_number')
      .unsigned()
      .notNullable()
      .index();
    table
      .integer('checkpoint_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('checkpoint')
      .index();
    table
      .string('nickname', 24)
      .notNullable()
      .index();
    table
      .timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable(tableName);
}