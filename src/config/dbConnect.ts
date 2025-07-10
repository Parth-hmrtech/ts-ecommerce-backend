import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from root or parent directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

// Type safety check for required vars
if (!DB_NAME || !DB_USER || !DB_PASS || !DB_HOST) {
  throw new Error("❌ Missing required environment variables for database connection.");
}

// Sequelize instance
const dbConnect = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false, // or console.log for SQL debug
});

export default dbConnect;
