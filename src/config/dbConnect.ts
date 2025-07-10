import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

if (!DB_NAME || !DB_USER || !DB_PASS || !DB_HOST) {
  throw new Error("Missing required environment variables for database connection.");
}

const dbConnect = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false, 
});

export default dbConnect;
