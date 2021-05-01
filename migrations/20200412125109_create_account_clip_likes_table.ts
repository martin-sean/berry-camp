import Knex from "knex";

const tableName = 'account_clip_likes';

exports.up = (knex: Knex): Promise<any> => {
  return knex.schema.createTable(tableName, (table) => {
    table
      .increments();
    table
      .integer('clip_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('clip')
      .onDelete('CASCADE')
      .index();
    table
      .integer('account_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('account')
      .onDelete('CASCADE')
      .index();
    table
      .timestamps(true, true);
  });
}

exports.down = (knex: Knex): Promise<any> => {
  return knex.schema.dropTable(tableName);
}