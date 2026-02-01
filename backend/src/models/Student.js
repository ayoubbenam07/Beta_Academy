import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    phoneNumber: String,
    birthDate: Date,
    profile: {
        avatar: String,
        bio: { type: String, maxlength: 500 }
    }
}, { timestamps: true });

StudentSchema.index({ email: 1 });

export default mongoose.model('Student', StudentSchema);