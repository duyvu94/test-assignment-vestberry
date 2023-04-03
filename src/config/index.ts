import dotenv from 'dotenv';

dotenv.config();

const {
  DB_NAME = 'mydatabase',
  DB_USER = 'myusername',
  DB_PASSWORD = 'mypassword',
  DB_HOST = 'localhost',
  DB_PORT = '5432',
  PORT = '3000',
  JWT_SECRET = 'mysecretkey',
} = process.env;

export const config = {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT: parseInt(DB_PORT, 10),
  PORT: parseInt(PORT, 10),
  JWT_SECRET,
};
