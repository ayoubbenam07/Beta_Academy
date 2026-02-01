import express from "express";
import {
    getAllLessons,
    getLessonsByCourse,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson,
    addLessonComment,
    addLessonReview,
} from "../controllers/lesson.controller.js";

const router = express.Router();

router.get("/", getAllLessons);
router.get("/course/:courseId", getLessonsByCourse);
router.get("/:id", getLessonById);
router.post("/", createLesson);
router.put("/:id", updateLesson);
router.delete("/:id", deleteLesson);
router.post("/:id/comments", addLessonComment);
router.post("/:id/reviews", addLessonReview);

export default router;

