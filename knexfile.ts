require('dotenv').config();
require('pg').defaults.ssl=true;

// Update with your config settings.
const herokuConnection = {
  client: "pg",
  connection: process.env.DATABASE_URL + '?sslmode=require',
  pool: {
    min: 0,
    max: 20
  },
  migrations: {
    tableName: "knex_migrations",
    // extension: 'ts',
  }
}

module.exports = {
  development: herokuConnection,
  production: herokuConnection,
};

// Typescript expects a module
export {}