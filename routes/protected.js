import express from 'express';
import { verifyAccessToken } from '../utils/jwt.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'TOKEN_MISSING',
        message: 'Access Token مطلوب في Header: Authorization: Bearer <token>'
      });
    }

    const token = authHeader.substring(7);

    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (error) {
      if (error.message === 'TOKEN_EXPIRED') {
        return res.status(401).json({
          success: false,
          error: 'TOKEN_EXPIRED',
          message: 'Access Token منتهي الصلاحية'
        });
      } else if (error.message === 'TOKEN_INVALID') {
        return res.status(401).json({
          success: false,
          error: 'TOKEN_INVALID',
          message: 'Access Token غير صالح'
        });
      } else {
        return res.status(401).json({
          success: false,
          error: 'TOKEN_VERIFICATION_FAILED',
          message: 'فشل التحقق من Access Token'
        });
      }
    }

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'USER_NOT_FOUND',
        message: 'المستخدم غير موجود'
      });
    }
    res.status(200).json({
      success: true,
      message: 'تم جلب البيانات بنجاح',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'حدث خطأ داخلي في السيرفر',
      details: error.message
    });
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'TOKEN_MISSING',
        message: 'Access Token مطلوب في Header: Authorization: Bearer <token>'
      });
    }

    const token = authHeader.substring(7);

    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (error) {
      if (error.message === 'TOKEN_EXPIRED') {
        return res.status(401).json({
          success: false,
          error: 'TOKEN_EXPIRED',
          message: 'Access Token منتهي الصلاحية'
        });
      } else if (error.message === 'TOKEN_INVALID') {
        return res.status(401).json({
          success: false,
          error: 'TOKEN_INVALID',
          message: 'Access Token غير صالح'
        });
      } else {
        return res.status(401).json({
          success: false,
          error: 'TOKEN_VERIFICATION_FAILED',
          message: 'فشل التحقق من Access Token'
        });
      }
    }
    res.status(200).json({
      success: true,
      message: 'مرحباً في لوحة التحكم',
      data: {
        userId: decoded.userId,
        email: decoded.email,
        dashboardData: {
          totalItems: 0,
          lastLogin: new Date()
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'حدث خطأ داخلي في السيرفر',
      details: error.message
    });
  }
});

export default router;

