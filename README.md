# JWT Authentication System

نظام مصادقة JWT مع Access Token و Refresh Token

## المميزات

- ✅ JWT Access Token + Refresh Token
- ✅ تسجيل مستخدم جديد
- ✅ تسجيل الدخول
- ✅ تجديد Access Token
- ✅ Routes محمية
- ✅ إدارة أخطاء واضحة

## التثبيت

```bash
npm install
```

## الإعداد

أنشئ ملف `.env`:

```
JWT_ACCESS_SECRET=your_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_ACCESS_EXPIRES_IN=900
JWT_REFRESH_EXPIRES_IN=604800
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/jwt_auth_db
```

## التشغيل

```bash
npm start
```

## API Endpoints

### Auth Routes
- `POST /api/auth/register` - تسجيل مستخدم جديد
- `POST /api/auth/login` - تسجيل الدخول
- `POST /api/auth/refresh` - تجديد Access Token

### Protected Routes
- `GET /api/protected/profile` - بيانات المستخدم
- `GET /api/protected/dashboard` - لوحة التحكم

## التشغيل على Render (مجاني)

1. اذهب إلى [Render.com](https://render.com)
2. سجّل الدخول بحساب GitHub
3. اضغط "New +" → "Web Service"
4. اختر المستودع: auth-system
5. الإعدادات:
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free
6. أضف Environment Variables من ملف `.env`
7. اضغط "Create Web Service"

## MongoDB Atlas (مجاني)

إذا كنت تحتاج MongoDB سحابي:
1. اذهب إلى [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. أنشئ حساب مجاني
3. أنشئ Cluster مجاني
4. انسخ رابط الاتصال وضعّه في `MONGODB_URI`

## الاستخدام

راجع ملف `examples.js` لأمثلة على استخدام الـ API
