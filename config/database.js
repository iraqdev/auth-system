import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jwt_auth_db');
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

