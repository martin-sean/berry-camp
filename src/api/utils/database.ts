import knex from 'knex';

export const connectToDatabase = (): knex => {
  return knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: { min: 0, max: 1 }
  });
}