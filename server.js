import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database.js';
import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'السيرفر يعمل بشكل طبيعي',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'مرحباً في نظام المصادقة JWT',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        refresh: 'POST /api/auth/refresh'
      },
      protected: {
        profile: 'GET /api/protected/profile',
        dashboard: 'GET /api/protected/dashboard'
      }
    }
  });
});

app.use((err, req, res, next) => {
  console.error('خطأ غير متوقع:', err);
  res.status(500).json({
    success: false,
    error: 'INTERNAL_ERROR',
    message: 'حدث خطأ داخلي في السيرفر'
  });
});

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

