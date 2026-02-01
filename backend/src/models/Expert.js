import mongoose from "mongoose";

const ExpertSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: String,
    experienceYears: Number,
    bio: String,
    image: String,
    socialLinks: {
        linkedin: String,
        twitter: String,
        website: String
    }
}, { timestamps: true });

ExpertSchema.index({ name: "text" });

export default mongoose.model('Expert', ExpertSchema);