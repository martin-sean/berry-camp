import dotenv from 'dotenv';
dotenv.config();

export default {
  client: "pg",
  connection: process.env.DATABASE_URL,
  pool: {
    min: 0,
    max: 20
  },
  migrations: {
    tableName: "knex_migrations",
    extension: 'ts',
  }
}
