const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection (commented out until fully implemented)
/*
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/elearning';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));
*/

// API Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is healthy' });
});

// Sample API responses for demo purposes
// In a real app, these would be connected to a database

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Demo users for testing
  if (email === 'admin@college.edu' && password === 'admin123') {
    res.json({
      token: 'demo-admin-token',
      refreshToken: 'demo-admin-refresh',
      user: {
        id: 1,
        name: 'Admin User',
        email: 'admin@college.edu',
        role: 'admin'
      }
    });
  } else if (email === 'faculty@college.edu' && password === 'faculty123') {
    res.json({
      token: 'demo-faculty-token',
      refreshToken: 'demo-faculty-refresh',
      user: {
        id: 2,
        name: 'Prof. Johnson',
        email: 'faculty@college.edu',
        role: 'faculty'
      }
    });
  } else if (email === 'student@college.edu' && password === 'student123') {
    res.json({
      token: 'demo-student-token',
      refreshToken: 'demo-student-refresh',
      user: {
        id: 3,
        name: 'Alex Smith',
        email: 'student@college.edu',
        role: 'student'
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Users routes
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'Admin User', email: 'admin@college.edu', role: 'admin' },
    { id: 2, name: 'Prof. Johnson', email: 'faculty@college.edu', role: 'faculty' },
    { id: 3, name: 'Alex Smith', email: 'student@college.edu', role: 'student' },
    { id: 4, name: 'Sarah Johnson', email: 'sarah.j@college.edu', role: 'student' },
    { id: 5, name: 'Michael Brown', email: 'michael.b@college.edu', role: 'faculty' }
  ]);
});

// Courses routes
app.get('/api/courses', (req, res) => {
  res.json([
    { id: 1, title: 'Introduction to Computer Science', faculty: 'Prof. Johnson', students: 38, status: 'active' },
    { id: 2, title: 'Advanced Mathematics', faculty: 'Dr. Emily Clark', students: 26, status: 'active' },
    { id: 3, title: 'Business Ethics', faculty: 'Dr. Michael Brown', students: 45, status: 'active' },
    { id: 4, title: 'Database Systems', faculty: 'Prof. Johnson', students: 42, status: 'active' },
    { id: 5, title: 'Advanced Algorithms', faculty: 'Prof. Johnson', students: 24, status: 'active' }
  ]);
});

// Enrolled courses for a student
app.get('/api/courses/enrolled', (req, res) => {
  res.json([
    { 
      id: 1, 
      title: 'Introduction to Computer Science', 
      instructor: 'Prof. Johnson', 
      progress: 75, 
      nextLesson: 'Arrays and Algorithms' 
    },
    { 
      id: 2, 
      title: 'Advanced Mathematics', 
      instructor: 'Dr. Emily Clark', 
      progress: 45, 
      nextLesson: 'Differential Equations' 
    },
    { 
      id: 3, 
      title: 'Business Ethics', 
      instructor: 'Dr. Michael Brown', 
      progress: 90, 
      nextLesson: 'Corporate Social Responsibility' 
    }
  ]);
});

// Assignments for a student
app.get('/api/assignments/student', (req, res) => {
  res.json([
    { 
      id: 1, 
      title: 'Algorithm Design Project', 
      course: 'Introduction to Computer Science', 
      deadline: '2023-08-25', 
      status: 'Not Started' 
    },
    { 
      id: 2, 
      title: 'Math Problem Set 3', 
      course: 'Advanced Mathematics', 
      deadline: '2023-08-20', 
      status: 'In Progress' 
    },
    { 
      id: 3, 
      title: 'Case Study Analysis', 
      course: 'Business Ethics', 
      deadline: '2023-08-18', 
      status: 'Almost Due' 
    }
  ]);
});

// Grades for a student
app.get('/api/grades/student', (req, res) => {
  res.json([
    { 
      id: 1, 
      title: 'Midterm Exam', 
      course: 'Introduction to Computer Science', 
      grade: 'A', 
      score: '92/100' 
    },
    { 
      id: 2, 
      title: 'Problem Set 2', 
      course: 'Advanced Mathematics', 
      grade: 'B+', 
      score: '87/100' 
    },
    { 
      id: 3, 
      title: 'Weekly Quiz 3', 
      course: 'Business Ethics', 
      grade: 'A-', 
      score: '90/100' 
    }
  ]);
});

// Faculty analytics
app.get('/api/analytics/faculty', (req, res) => {
  res.json({
    courses: [
      { 
        id: 1, 
        title: 'Introduction to Computer Science', 
        students: 38, 
        avgGrade: 'B+', 
        passing: 35, 
        total: 38, 
        avgScore: 86 
      },
      { 
        id: 2, 
        title: 'Advanced Algorithms', 
        students: 24, 
        avgGrade: 'B', 
        passing: 20, 
        total: 24, 
        avgScore: 82 
      },
      { 
        id: 3, 
        title: 'Database Systems', 
        students: 42, 
        avgGrade: 'B-', 
        passing: 38, 
        total: 42, 
        avgScore: 79 
      }
    ],
    pendingAssignments: 63,
    upcomingClasses: 5,
    totalStudents: 104
  });
});

// Admin analytics
app.get('/api/analytics/admin', (req, res) => {
  res.json({
    totalUsers: 1245,
    activeCourses: 32,
    totalAssignments: 186,
    supportTickets: 8,
    recentUsers: [
      { id: 1, name: 'John Davis', email: 'john.davis@example.com', role: 'Student', status: 'Active', date: '2023-08-15' },
      { id: 2, name: 'Maria Rodriguez', email: 'maria.r@example.com', role: 'Faculty', status: 'Active', date: '2023-08-14' },
      { id: 3, name: 'Alex Wong', email: 'alex.w@example.com', role: 'Student', status: 'Pending', date: '2023-08-13' },
      { id: 4, name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'Student', status: 'Active', date: '2023-08-12' },
      { id: 5, name: 'Robert Chen', email: 'robert.c@example.com', role: 'Faculty', status: 'Inactive', date: '2023-08-10' }
    ],
    recentCourses: [
      { id: 1, title: 'Introduction to Computer Science', faculty: 'Dr. James Wilson', students: 38, status: 'Active' },
      { id: 2, title: 'Advanced Mathematics', faculty: 'Prof. Emily Clark', students: 26, status: 'Active' },
      { id: 3, title: 'Business Ethics', faculty: 'Dr. Michael Brown', students: 45, status: 'Pending' }
    ]
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; 