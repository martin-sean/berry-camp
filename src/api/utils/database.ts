import Knex from 'knex';

interface GlobalWithKnex extends NodeJS.Global {
  knex?: Knex;
}

/**
 * Initialise a new knex connection pool if one doesn't globally exist.
 * @returns Knex instance.
 */
export const initialiseKnex = (): Knex => {
  let knex: Knex | undefined = (global as GlobalWithKnex).knex;
  if (!knex) {
    knex = Knex({
      client: 'pg',
      connection: process.env.DATABASE_URL,
      pool: { min: 0, max: 5 }
    });
    (global as GlobalWithKnex).knex = knex;
    console.info("Initialised new knex connection pool");
  }
  return knex;
}