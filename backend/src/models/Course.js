import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    overview: String,
    image: String,
    priceDZD: { type: Number, min: 0, required: true },
    expertId: { type: mongoose.Schema.Types.ObjectId, ref: 'Expert' },

    previewVideo: {
        url: { type: String, required: true },
        durationSeconds: Number,
        thumbnail: String,
        title: String
    },

    reviews: [
        {
            studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
            studentName: { type: String, required: true },           // denormalized for display
            studentAvatar: { type: String },
            rating: { type: Number, min: 1, max: 5, required: true },
            reviewText: { type: String, maxlength: 1000 },
            helpfulCount: { type: Number, default: 0 },
            createdAt: { type: Date, default: Date.now }
        }
    ],

}, { timestamps: true });

export default mongoose.model('Course', CourseSchema);