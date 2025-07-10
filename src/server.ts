import express, { Request, Response } from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import sequelize from './config/dbConnect';
import indexRoutes from './routes/index';
import cors from 'cors';

dotenv.config();
dotenv.config({ path: '../.env' });

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
  },
}));

app.use('/api', indexRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connected.');

    return sequelize.sync(); 
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });
