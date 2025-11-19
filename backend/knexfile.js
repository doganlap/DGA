// Knex.js Configuration for DGA Oversight Platform
require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'db.prisma.io',
      port: 5432,
      user: '4b27279d441b0b3dbc72afd64ef1ebe7c1758646d9739580494973a5d87d86a5',
      password: 'sk_-u2O2542aeQD0B-U8GRPd',
      database: 'postgres',
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'postgres',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },

  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
};
