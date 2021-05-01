import Knex from 'knex';

export const connectToDatabase = (): Knex => {
  return Knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: { min: 0, max: 1 }
  });
}