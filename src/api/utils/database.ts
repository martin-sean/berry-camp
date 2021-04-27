import knex, {Knex} from 'knex';

export const connectToDatabase = (): Knex => {
  return knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: { min: 0, max: 1 }
  });
}