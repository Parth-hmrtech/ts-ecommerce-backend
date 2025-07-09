import express, { Request, Response } from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import sequelize from './config/dbConnect';
import indexRoutes from './routes/index';
import cors from 'cors';

dotenv.config();
dotenv.config({ path: '../.env' }); // Optional if already loaded above

const app = express();

const PORT = process.env.PORT || 3000;

// CORS Setup
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Parse JSON
app.use(express.json());

// Express session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // should be true in production with HTTPS
    httpOnly: true,
  },
}));

// Main Routes
app.use('/api', indexRoutes);

// Fallback for 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

// DB Connection + Server Startup
sequelize.authenticate()
  .then(() => {
    console.log('Database connected.');

    return sequelize.sync(); // Sync models with DB
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });
