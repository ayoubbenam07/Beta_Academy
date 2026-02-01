import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true },
    explanation: String
}, { _id: false });

const QuizSchema = new mongoose.Schema({
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    title: { type: String, required: true },
    passingScore: { type: Number, default: 0.7 },
    questions: [QuestionSchema]
}, { timestamps: true });

QuizSchema.index({ lessonId: 1 });

export default mongoose.model('Quiz', QuizSchema);