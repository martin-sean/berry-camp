import * as Knex from "knex";

const tableName = 'account';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(tableName, (table) => {
    table
      .increments();
    table
      .string('email')
      .notNullable();
    table
      .string('username')
      .notNullable();
    table
      .timestamps(true, true);
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(tableName);
}