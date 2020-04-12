import * as Knex from "knex";

const tableName = 'tag'

export async function up(knex: Knex): Promise<any> {
  knex.schema.createTable(tableName, (table) => {
    table
      .increments();
    table
      .string('name', 24)
      .notNullable();
    table
      .timestamps(true, true);
  })
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable(tableName);
}