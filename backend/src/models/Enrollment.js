import mongoose from "mongoose";

const LessonProgressSchema = new mongoose.Schema({
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
    progress: { type: Number, min: 0, max: 1, default: 0 },
    isCompleted: { type: Boolean, default: false },
    timeSpentSeconds: { type: Number, default: 0 }
}, { _id: false });

const QuizAttemptSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    score: { type: Number, min: 0, max: 1 },
    passed: Boolean,
    timeTakenSeconds: Number,
    answers: [Number]
}, { timestamps: true });

const EnrollmentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    enrolledAt: { type: Date, default: Date.now },
    completedAt: Date,
    overallProgress: { type: Number, min: 0, max: 1, default: 0 },
    lastAccessedAt: Date,

    lessonProgress: [LessonProgressSchema],
    quizAttempts: [QuizAttemptSchema]
}, { timestamps: true });

EnrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });
EnrollmentSchema.index({ studentId: 1 });
EnrollmentSchema.index({ courseId: 1 });

export default mongoose.model('Enrollment', EnrollmentSchema);