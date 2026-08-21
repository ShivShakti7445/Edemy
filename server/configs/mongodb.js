import mongoose from "mongoose";

// Connect to the MongoDB database
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MONGODB_URI environment variable is not defined!");
        return;
    }
    try {
        mongoose.connection.on('connected', () => console.log('Database Connected'))
        const dbUri = uri.endsWith('/lms-copy') ? uri : `${uri.replace(/\/$/, '')}/lms-copy`;
        await mongoose.connect(dbUri);
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
    }
}

export default connectDB
