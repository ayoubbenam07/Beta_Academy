# Beta Academy 🎓

A modern, full-stack e-learning platform built with React, Node.js, Express, and MongoDB. Beta Academy provides a comprehensive online learning experience with course management, student enrollment, interactive quizzes, and progress tracking.

![Beta Academy](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Database Seeding](#database-seeding)
- [API Documentation](#api-documentation)
- [User Roles](#user-roles)
- [Contributing](#contributing)

## ✨ Features

### For Students
- 🔐 **Secure Authentication** - JWT-based login and registration
- 📚 **Course Browsing** - Explore a wide range of courses with detailed previews
- 💳 **Course Enrollment** - Purchase and enroll in courses with a simulated payment system
- 📝 **Interactive Quizzes** - Take quizzes and track your performance
- 📊 **Progress Tracking** - Monitor your learning progress across all courses
- 🎯 **Personalized Dashboard** - View enrolled courses and analytics
- ⭐ **Course Reviews** - Rate and review courses

### For Admins
- 📋 **Course Management** - Create, edit, and delete courses
- 👥 **Student Management** - View and manage student enrollments
- 📈 **Analytics Dashboard** - Track platform performance and revenue
- 🎬 **Lesson & Quiz Management** - Manage course content and assessments
- 👨‍🏫 **Expert Profiles** - Manage instructor information

### Technical Features
- 🔄 **Real-time Updates** - State management with Zustand
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🔒 **Secure Backend** - Password hashing with bcrypt and JWT authentication
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🚀 **Fast Performance** - Optimized with React and Vite

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Recharts** - Data visualization
- **Swiper** - Touch slider library

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing

## 📁 Project Structure

```
Beta_Academy/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Custom middleware (auth, etc.)
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── scripts/         # Utility scripts (seed.js)
│   │   └── server.js        # Entry point
│   ├── .env                 # Environment variables
│   └── package.json
│
└── frontend/
    ├── public/              # Static assets
    ├── src/
    │   ├── compenents/      # React components
    │   │   ├── courses/     # Course-related components
    │   │   ├── stores/      # Zustand state stores
    │   │   └── ...
    │   ├── pages/           # Page components
    │   ├── App.jsx          # Main app component
    │   └── main.jsx         # Entry point
    └── package.json
```

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Beta_Academy.git
   cd Beta_Academy
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/beta_academy

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

### Frontend Configuration

The frontend is pre-configured to connect to `http://localhost:5000`. If you need to change this, update the API endpoints in `frontend/src/compenents/stores/useCoursesStore.js`.

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start MongoDB**
   ```bash
   # On Windows (if using MongoDB service)
   net start MongoDB
   
   # Or run MongoDB manually
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

3. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Start backend in production mode
cd ../backend
NODE_ENV=production node src/server.js
```

## 🌱 Database Seeding

To populate the database with sample data (courses, lessons, quizzes, experts):

```bash
cd backend
node src/scripts/seed.js
```

This will create:
- 3 sample courses (Data Science, Algorithms, Web Development)
- 5 lessons per course
- Quizzes for each lesson
- Expert profiles
- Demo student account

**⚠️ Warning:** The seed script will clear existing data before seeding.

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new student |
| POST | `/api/auth/login` | Student login |

### Course Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/course` | Get all courses |
| GET | `/api/course/:id` | Get course by ID |
| POST | `/api/course` | Create new course (Admin) |
| PUT | `/api/course/:id` | Update course (Admin) |
| DELETE | `/api/course/:id` | Delete course (Admin) |

### Lesson Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/lesson/course/:courseId` | Get lessons by course |
| POST | `/api/lesson` | Create new lesson (Admin) |
| PUT | `/api/lesson/:id` | Update lesson (Admin) |

### Quiz Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/quiz/lesson/:lessonId` | Get quiz by lesson |
| POST | `/api/quiz` | Create new quiz (Admin) |

### Enrollment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/enrollment/student/:studentId` | Get student enrollments |
| POST | `/api/enrollment` | Create enrollment |
| POST | `/api/enrollment/:id/quiz-attempt` | Save quiz attempt |
| PUT | `/api/enrollment/:id/lesson-progress` | Update lesson progress |

## 👥 User Roles

### Student
- Default email: `demo@student.com`
- Password: Set during registration
- Can enroll in courses, take quizzes, track progress

### Admin
- Email: `admin@gmail.com`
- Password: `admin123` (Change in production!)
- Full access to course and student management

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Ayoub Benamrouche**

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Built with ❤️ for education and learning**
