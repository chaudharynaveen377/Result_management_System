# Result Management System - Setup & Troubleshooting Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm (v6+)
- MongoDB running locally or MongoDB Atlas connection string

### Installation & Running

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```
The backend will start on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```
The frontend will start on `http://localhost:3000`

---

## 🔧 Configuration

### Backend (.env file)
Create/Update `backend/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/result_management
JWT_SECRET=your_super_secret_key_here_change_this
NODE_ENV=development
```

### Frontend (.env file)
Create/Update `frontend/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### Issue: 403 Forbidden Errors on API Calls

**Problem:** All API calls return 403 even after login.

**Solution:**
1. Check that the JWT token is being sent in the Authorization header
   - Open Browser DevTools → Network tab
   - Check the request headers for `Authorization: Bearer <token>`

2. Verify `JWT_SECRET` in `.env` matches on both backend and frontend

3. Clear browser localStorage and login again:
   ```javascript
   localStorage.clear()
   location.reload()
   ```

4. Restart both backend and frontend servers

### Issue: "react-scripts is not recognized"

**Solution:**
```bash
cd frontend
npm install --force
npm start
```

### Issue: MongoDB Connection Error

**Solution 1 - Local MongoDB:**
- Install MongoDB Community Edition
- Start MongoDB service
- Ensure `MONGO_URI=mongodb://localhost:27017/result_management`

**Solution 2 - MongoDB Atlas (Cloud):**
- Create cluster at https://www.mongodb.com/cloud/atlas
- Get connection string
- Update `.env`: `MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/result_management`

### Issue: CORS Errors

**Solution:** Ensure backend has CORS enabled (already configured in server.js)
- Backend should show: "MongoDB connected" and "Server running on port 5000"

---

## 📝 Test Credentials

### Creating Admin Account
1. Go to `http://localhost:3000/signup`
2. Fill form:
   - Name: Admin User
   - Email: admin@example.com
   - Password: password123
   - Role: **Admin**
3. Click Sign up → Auto-redirects to `/admin` dashboard

### Creating Student Account
1. Go to `http://localhost:3000/signup`
2. Fill form:
   - Name: John Doe
   - Email: student@example.com
   - Password: password123
   - Roll Number: R001
   - Course: B.Tech
   - Semester: 4
   - Role: **Student**
3. Click Sign up → Auto-redirects to `/student` dashboard

---

## 📊 API Routes Reference

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### Admin Routes (Protected)
- `GET /api/admin/dashboard` - Get analytics
- `GET /api/admin/students` - List all students
- `POST /api/admin/students` - Add student
- `PUT /api/admin/students/:id` - Update student
- `DELETE /api/admin/students/:id` - Delete student
- `GET /api/admin/results` - List all results
- `POST /api/admin/results` - Add result
- `PUT /api/admin/results/:id` - Update result
- `DELETE /api/admin/results/:id` - Delete result
- `GET /api/admin/subjects` - List subjects
- `POST /api/admin/subjects` - Add subject

### Student Routes (Protected)
- `GET /api/student/profile` - Get student profile
- `GET /api/student/results` - Get student results
- `GET /api/student/analytics` - Get performance analytics

---

## 🔍 Debug Tips

1. **Check Backend Logs:**
   - Look for "MongoDB connected"
   - Look for "Server running on port 5000"
   - Check for JWT verification errors

2. **Check Frontend Console:**
   - Open DevTools (F12)
   - Check Network tab for API calls
   - Look for token in localStorage: `localStorage.getItem('token')`

3. **Verify Token:**
   - Paste token at https://jwt.io to decode
   - Check if role is correctly set

4. **Test API with Postman/curl:**
   ```bash
   # Login
   curl -X POST http://localhost:5000/api/auth/login \
   -H "Content-Type: application/json" \
   -d '{"email":"admin@example.com","password":"password123"}'

   # Use returned token in header
   curl -X GET http://localhost:5000/api/admin/dashboard \
   -H "Authorization: Bearer <your_token_here>"
   ```

---

## ✨ Next Steps

1. Test the complete flow: Signup → Login → Admin/Student Dashboard
2. Add sample data (students, subjects, results)
3. Test charts on student analytics page
4. Customize styling in Tailwind CSS

Happy coding! 🎉