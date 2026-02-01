import express from "express";
import {
    getAllQuizzes,
    getQuizByLesson,
    getQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    submitQuizAnswers,
} from "../controllers/quiz.controller.js";

const router = express.Router();

router.get("/", getAllQuizzes);
router.get("/lesson/:lessonId", getQuizByLesson);
router.get("/:id", getQuizById);
router.post("/", createQuiz);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);
router.post("/:id/submit", submitQuizAnswers);

export default router;

