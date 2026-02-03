import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import connectDB from "./config/db.js"
import courseRouter from './routes/course.routes.js'
import studentRouter from './routes/student.routes.js'
import expertRouter from './routes/expert.routes.js'
import lessonRouter from './routes/lesson.routes.js'
import quizRouter from './routes/quiz.routes.js'
import enrollmentRouter from './routes/enrollment.routes.js'
import authRouter from './routes/auth.routes.js'
dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// CORS Configuration - Allow both development and production origins
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
    process.env.FRONTEND_URL // Add production frontend URL from environment
].filter(Boolean); // Remove undefined values

if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: allowedOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }))
}

// Middleware
app.use(express.json())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/course', courseRouter)
app.use('/api/student', studentRouter)
app.use('/api/expert', expertRouter)
app.use('/api/lesson', lessonRouter)
app.use('/api/quiz', quizRouter)
app.use('/api/enrollment', enrollmentRouter)


if (process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "../../frontend/dist")
    app.use(express.static(frontendPath))
    app.get("*path", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"))
    })
}

connectDB()

app.listen(PORT, () => {
    console.log("server is listening on PORT:", PORT);
})

