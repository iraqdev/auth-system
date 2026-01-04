import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * الاتصال بقاعدة البيانات MongoDB
 */
export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jwt_auth_db');
    console.log('✓ تم الاتصال بقاعدة البيانات بنجاح');
  } catch (error) {
    console.error('✗ خطأ في الاتصال بقاعدة البيانات:', error.message);
    process.exit(1);
  }
};

