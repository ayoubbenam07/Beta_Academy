import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected successfully")
    } catch (e) {
        console.error("Failed to connect:", e.message)
        process.exit(1);
    }
};

export default connectDB