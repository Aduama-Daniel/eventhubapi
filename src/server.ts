// backend/src/server.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import eventRoutes from './routes/eventRoutes';  // Make sure the path is correct

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// In server.ts
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 204
  };
  
  app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/eventhub')
  .then(() => console.log('MongoDB connected'))
  .catch((err: Error) => console.log('MongoDB connection error:', err));

// Define routes
app.get('/', (req: Request, res: Response) => {
  res.send('EventHub API is running');
});

// Event routes
app.use('/api/events', eventRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});