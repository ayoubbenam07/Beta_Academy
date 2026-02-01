import express from "express";
import {
    getAllEnrollments,
    getEnrollmentsByStudent,
    getEnrollmentsByCourse,
    getEnrollmentById,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
    updateLessonProgress,
    addQuizAttempt,
} from "../controllers/enrollment.controller.js";

const router = express.Router();

router.get("/", getAllEnrollments);
router.get("/student/:studentId", getEnrollmentsByStudent);
router.get("/course/:courseId", getEnrollmentsByCourse);
router.get("/:id", getEnrollmentById);
router.post("/", createEnrollment);
router.put("/:id", updateEnrollment);
router.delete("/:id", deleteEnrollment);
router.put("/:id/lesson-progress", updateLessonProgress);
router.post("/:id/quiz-attempt", addQuizAttempt);

export default router;

