// Update with your config settings.
const herokuConnection = {
  client: "pg",
  connection: {
    host: process.env.DATABASE_URL + "sslmode=require",
    ssl: true,
  },
  pool: {
    min: 0,
    max: 20
  },
  migrations: {
    tableName: "knex_migrations",
    extension: 'ts',
  }
}

module.exports = {
  development: herokuConnection,
  production: herokuConnection,
};
