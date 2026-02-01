import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    downloadUrl: { type: String, required: true },
    fileType: { type: String, enum: ['pdf', 'doc', 'zip', 'ppt', 'image', 'other'] },
    fileSizeBytes: Number
}, { _id: false });

const CommentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    content: { type: String, required: true, maxlength: 2000 },
    likes: { type: Number, default: 0 },
}, { timestamps: true });

const LessonSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    description: String,
    lessonOrder: { type: Number, required: true },

    // Embedded video
    video: {
        url: { type: String, required: true },
        durationSeconds: { type: Number, required: true },
        thumbnail: String,
        title: String
    },

    reviews: [
        {
            studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
            studentName: { type: String, required: true },
            studentAvatar: { type: String },
            rating: { type: Number, min: 1, max: 5, required: true },
            reviewText: { type: String, maxlength: 800 },
            createdAt: { type: Date, default: Date.now }
        }
    ],

    // Embedded resources
    resources: [ResourceSchema],

    // Embedded comments
    comments: [CommentSchema],

    isPreview: { type: Boolean, default: false }
}, { timestamps: true });

// Indexes for fast lookup & ordering
LessonSchema.index({ courseId: 1, lessonOrder: 1 });
LessonSchema.index({ courseId: 1 });

export default mongoose.model('Lesson', LessonSchema);