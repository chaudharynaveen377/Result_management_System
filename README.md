# Result Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing student results with role-based access control.

## Features

### Admin Features
- Dashboard with analytics (total students, average scores, etc.)
- Add/manage students
- Add/manage results
- View all students and their performance
- Search and filter students
- Manage subjects

### Student Features
- View personal profile
- View all results (semester-wise)
- Performance analytics with charts

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Chart.js, React Router
- **Backend**: Node.js, Express.js, JWT, bcrypt
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with role-based access

## Project Structure

```
result-management-system/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/result_management
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

4. Start MongoDB service (if using local MongoDB)

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Usage

1. Open your browser and go to `http://localhost:3000`
2. For admin access, you need to create an admin user first (you can modify the signup to allow admin role or create one directly in the database)
3. For student access, signup as a student

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Admin Routes (require admin auth)
- `GET /api/admin/dashboard` - Get dashboard analytics
- `GET /api/admin/students` - Get all students
- `POST /api/admin/students` - Add new student
- `PUT /api/admin/students/:id` - Update student
- `DELETE /api/admin/students/:id` - Delete student
- `GET /api/admin/results` - Get all results
- `POST /api/admin/results` - Add new result
- `PUT /api/admin/results/:id` - Update result
- `DELETE /api/admin/results/:id` - Delete result
- `GET /api/admin/subjects` - Get all subjects
- `POST /api/admin/subjects` - Add new subject

### Student Routes (require student auth)
- `GET /api/student/profile` - Get student profile
- `GET /api/student/results` - Get student results
- `GET /api/student/analytics` - Get performance analytics

## Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String,
  role: String (enum: ['admin', 'student']),
  rollNumber: String (required for students),
  course: String (required for students),
  semester: Number (required for students),
}
```

### Subject
```javascript
{
  name: String,
  code: String (unique),
  credits: Number,
  course: String,
}
```

### Result
```javascript
{
  student: ObjectId (ref: 'User'),
  subject: ObjectId (ref: 'Subject'),
  marks: Number (0-100),
  grade: String,
  semester: Number,
  year: Number,
}
```

## Deployment

### Backend Deployment
- Use services like Heroku, Vercel, or AWS for backend deployment
- Set environment variables in your deployment platform
- Ensure MongoDB is accessible (use MongoDB Atlas for cloud database)

### Frontend Deployment
- Build the production version: `npm run build`
- Deploy to services like Vercel, Netlify, or GitHub Pages

## Future Enhancements

- Email notifications for result updates
- PDF generation for results
- Pagination for large datasets
- Dark mode UI
- File upload for student photos/documents
- Advanced search and filtering
- Result export functionality