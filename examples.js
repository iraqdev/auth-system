/**
 * أمثلة على استخدام الـ API
 * يمكنك نسخ هذه الأمثلة واستخدامها في Postman أو أي أداة مشابهة
 */

// ============================================
// مثال 1: تسجيل مستخدم جديد
// ============================================
/*
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "username": "ahmed",
  "email": "ahmed@example.com",
  "password": "123456"
}
*/

// ============================================
// مثال 2: تسجيل الدخول
// ============================================
/*
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "ahmed@example.com",
  "password": "123456"
}
*/

// ============================================
// مثال 3: الوصول إلى Route محمي (Profile)
// ============================================
/*
GET http://localhost:3000/api/protected/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
*/

// ============================================
// مثال 4: الوصول إلى Route محمي (Dashboard)
// ============================================
/*
GET http://localhost:3000/api/protected/dashboard
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
*/

// ============================================
// مثال 5: تجديد Access Token
// ============================================
/*
POST http://localhost:3000/api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
*/

// ============================================
// مثال 6: التحقق من حالة السيرفر
// ============================================
/*
GET http://localhost:3000/health
*/

// ============================================
// ملاحظات:
// ============================================
// 1. استبدل "eyJhbGc..." بـ Access Token الفعلي الذي تحصل عليه من Login أو Register
// 2. استبدل "eyJhbGc..." في Refresh بـ Refresh Token الفعلي
// 3. تأكد من أن السيرفر يعمل على المنفذ 3000 (أو المنفذ المحدد في .env)
// 4. في Postman:
//    - للـ Headers: اذهب إلى تبويب "Headers" وأضف Authorization
//    - للـ Body: اذهب إلى تبويب "Body" واختر "raw" ثم "JSON"

