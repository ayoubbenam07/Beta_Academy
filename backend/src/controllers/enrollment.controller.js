import Enrollment from "../models/Enrollment.js"
import Course from "../models/Course.js"
import Student from "../models/Student.js"

export async function getAllEnrollments(_, res) {
    try {
        const enrollments = await Enrollment.find()
            .populate('studentId', '-passwordHash')
            .populate('courseId')
        res.status(200).json(enrollments)
    } catch (error) {
        console.error("Error in getAllEnrollments controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getEnrollmentsByStudent(req, res) {
    try {
        const { studentId } = req.params
        const enrollments = await Enrollment.find({ studentId })
            .populate('courseId')
            .sort({ enrolledAt: -1 })
        res.status(200).json(enrollments)
    } catch (error) {
        console.error("Error in getEnrollmentsByStudent controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getEnrollmentsByCourse(req, res) {
    try {
        const { courseId } = req.params
        const enrollments = await Enrollment.find({ courseId })
            .populate('studentId', '-passwordHash')
            .sort({ enrolledAt: -1 })
        res.status(200).json(enrollments)
    } catch (error) {
        console.error("Error in getEnrollmentsByCourse controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getEnrollmentById(req, res) {
    try {
        const enrollment = await Enrollment.findById(req.params.id)
            .populate('studentId', '-passwordHash')
            .populate('courseId')
        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" })
        }
        res.status(200).json(enrollment)
    } catch (error) {
        console.error("Error in getEnrollmentById controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function createEnrollment(req, res) {
    try {
        const { studentId, courseId } = req.body
        
        if (!studentId || !courseId) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        // Check if student and course exist
        const student = await Student.findById(studentId)
        const course = await Course.findById(courseId)

        if (!student) {
            return res.status(404).json({ message: "Student not found" })
        }
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        // Check if enrollment already exists
        const existingEnrollment = await Enrollment.findOne({ studentId, courseId })
        if (existingEnrollment) {
            return res.status(400).json({ message: "Student is already enrolled in this course" })
        }

        const enrollment = new Enrollment({
            studentId,
            courseId
        })

        const savedEnrollment = await enrollment.save()
        const populatedEnrollment = await Enrollment.findById(savedEnrollment._id)
            .populate('studentId', '-passwordHash')
            .populate('courseId')

        res.status(201).json(populatedEnrollment)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Student is already enrolled in this course" })
        }
        console.error("Error in createEnrollment controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function updateEnrollment(req, res) {
    try {
        const { id } = req.params
        const updateData = req.body

        const enrollment = await Enrollment.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        )
            .populate('studentId', '-passwordHash')
            .populate('courseId')

        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" })
        }

        res.status(200).json(enrollment)
    } catch (error) {
        console.error("Error in updateEnrollment controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function deleteEnrollment(req, res) {
    try {
        const { id } = req.params

        const enrollment = await Enrollment.findByIdAndDelete(id)

        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" })
        }

        res.status(200).json({ message: "Enrollment deleted successfully" })
    } catch (error) {
        console.error("Error in deleteEnrollment controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function updateLessonProgress(req, res) {
    try {
        const { id } = req.params
        const { lessonId, progress, isCompleted, timeSpentSeconds } = req.body

        if (!lessonId) {
            return res.status(400).json({ message: "lessonId is required" })
        }

        const enrollment = await Enrollment.findById(id)
        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" })
        }

        const lessonProgressIndex = enrollment.lessonProgress.findIndex(
            lp => lp.lessonId.toString() === lessonId
        )

        if (lessonProgressIndex >= 0) {
            // Update existing progress
            if (progress !== undefined) enrollment.lessonProgress[lessonProgressIndex].progress = progress
            if (isCompleted !== undefined) enrollment.lessonProgress[lessonProgressIndex].isCompleted = isCompleted
            if (timeSpentSeconds !== undefined) enrollment.lessonProgress[lessonProgressIndex].timeSpentSeconds = timeSpentSeconds
        } else {
            // Add new progress
            enrollment.lessonProgress.push({
                lessonId,
                progress: progress || 0,
                isCompleted: isCompleted || false,
                timeSpentSeconds: timeSpentSeconds || 0
            })
        }

        // Update overall progress
        const totalLessons = enrollment.lessonProgress.length
        const completedLessons = enrollment.lessonProgress.filter(lp => lp.isCompleted).length
        enrollment.overallProgress = totalLessons > 0 ? completedLessons / totalLessons : 0

        enrollment.lastAccessedAt = new Date()
        await enrollment.save()

        res.status(200).json(enrollment)
    } catch (error) {
        console.error("Error in updateLessonProgress controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function addQuizAttempt(req, res) {
    try {
        const { id } = req.params
        const { quizId, score, passed, timeTakenSeconds, answers } = req.body

        if (!quizId || score === undefined || passed === undefined) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const enrollment = await Enrollment.findById(id)
        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" })
        }

        enrollment.quizAttempts.push({
            quizId,
            score,
            passed,
            timeTakenSeconds,
            answers: answers || []
        })

        await enrollment.save()

        res.status(201).json(enrollment)
    } catch (error) {
        console.error("Error in addQuizAttempt controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

