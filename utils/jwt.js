import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * إنشاء Access Token
 */
export const generateAccessToken = (payload) => {
  if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_ACCESS_EXPIRES_IN) {
    throw new Error('JWT_ACCESS_SECRET و JWT_ACCESS_EXPIRES_IN مطلوبان في ملف .env');
  }
  return jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
    }
  );
};

/**
 * إنشاء Refresh Token
 */
export const generateRefreshToken = (payload) => {
  if (!process.env.JWT_REFRESH_SECRET || !process.env.JWT_REFRESH_EXPIRES_IN) {
    throw new Error('JWT_REFRESH_SECRET و JWT_REFRESH_EXPIRES_IN مطلوبان في ملف .env');
  }
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
    }
  );
};

/**
 * التحقق من Access Token
 */
export const verifyAccessToken = (token) => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error('JWT_ACCESS_SECRET مطلوب في ملف .env');
  }
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('TOKEN_EXPIRED');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('TOKEN_INVALID');
    } else {
      throw new Error('TOKEN_VERIFICATION_FAILED');
    }
  }
};

/**
 * التحقق من Refresh Token
 */
export const verifyRefreshToken = (token) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET مطلوب في ملف .env');
  }
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('REFRESH_TOKEN_EXPIRED');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('REFRESH_TOKEN_INVALID');
    } else {
      throw new Error('REFRESH_TOKEN_VERIFICATION_FAILED');
    }
  }
};

