import express from 'express';
import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';

const router = express.Router();

/**
 * Route: POST /api/auth/register
 * تسجيل مستخدم جديد
 */
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // التحقق من البيانات المطلوبة
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_FIELDS',
        message: 'جميع الحقول مطلوبة: username, email, password'
      });
    }

    // التحقق من وجود المستخدم
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'USER_EXISTS',
        message: 'المستخدم موجود بالفعل'
      });
    }

    // إنشاء المستخدم
    const user = new User({ username, email, password });
    await user.save();

    // إنشاء التوكنات
    const accessToken = generateAccessToken({ userId: user._id, email: user.email });
    const refreshToken = generateRefreshToken({ userId: user._id });

    res.status(201).json({
      success: true,
      message: 'تم التسجيل بنجاح',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        },
        tokens: {
          accessToken,
          refreshToken
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

/**
 * Route: POST /api/auth/login
 * تسجيل الدخول
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // التحقق من البيانات المطلوبة
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_FIELDS',
        message: 'البريد الإلكتروني وكلمة المرور مطلوبان'
      });
    }

    // البحث عن المستخدم
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'INVALID_CREDENTIALS',
        message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
      });
    }

    // التحقق من كلمة المرور
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'INVALID_CREDENTIALS',
        message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
      });
    }

    // إنشاء التوكنات
    const accessToken = generateAccessToken({ userId: user._id, email: user.email });
    const refreshToken = generateRefreshToken({ userId: user._id });

    res.status(200).json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        },
        tokens: {
          accessToken,
          refreshToken
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

/**
 * Route: POST /api/auth/refresh
 * تجديد Access Token باستخدام Refresh Token
 */
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // التحقق من وجود Refresh Token
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_TOKEN',
        message: 'Refresh Token مطلوب'
      });
    }

    // التحقق من صحة Refresh Token
    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (error) {
      if (error.message === 'REFRESH_TOKEN_EXPIRED') {
        return res.status(401).json({
          success: false,
          error: 'TOKEN_EXPIRED',
          message: 'Refresh Token منتهي الصلاحية'
        });
      } else if (error.message === 'REFRESH_TOKEN_INVALID') {
        return res.status(401).json({
          success: false,
          error: 'TOKEN_INVALID',
          message: 'Refresh Token غير صالح'
        });
      } else {
        return res.status(401).json({
          success: false,
          error: 'TOKEN_VERIFICATION_FAILED',
          message: 'فشل التحقق من Refresh Token'
        });
      }
    }

    // التحقق من وجود المستخدم
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'USER_NOT_FOUND',
        message: 'المستخدم غير موجود'
      });
    }

    // إنشاء Access Token جديد
    const accessToken = generateAccessToken({ userId: user._id, email: user.email });

    res.status(200).json({
      success: true,
      message: 'تم تجديد Access Token بنجاح',
      data: {
        accessToken
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

