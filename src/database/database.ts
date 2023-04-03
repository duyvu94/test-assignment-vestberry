import { Sequelize } from 'sequelize-typescript';
import { config } from '../config';
import * as models from '../models';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB_NAME,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  models: Object.values(models),
});
