import Knex from 'knex';

interface GlobalWithKnex extends NodeJS.Global {
  knex?: Knex;
}

/**
 * Initialises a new knex connection.
 * @returns Knex instance
 */
export const initialiseKnex = (): Knex => Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: { min: 0, max: 1 }
});

/**
 * Initialise a new knex connection if one doesn't globally exist.
 * @returns Knex instance.
 */
export const initialiseGlobalKnex = (): Knex => {
  let knex: Knex | undefined = (global as GlobalWithKnex).knex;
  if (!knex) {
    knex = Knex({
      client: 'pg',
      connection: process.env.DATABASE_URL,
      pool: { min: 0, max: 1 }
    });
    (global as GlobalWithKnex).knex = knex;
    console.info("Initialised new knex connection");
  }
  return knex;
}