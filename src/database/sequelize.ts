import dotenv from 'dotenv';
import { Options } from 'sequelize';

dotenv.config();

interface ConfigTs {
  development: Options;
  test: Options;
  production: Options;
}

const configDB: ConfigTs = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      charset: 'utf8',
    },
    define: {
      timestamps: true,
    },
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      charset: 'utf8',
    },
    define: {
      timestamps: true,
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      charset: 'utf8',
      multipleStatements: true,
    },
    logging: false,
    define: {
      timestamps: true,
    },
  },
};
module.exports = configDB;
