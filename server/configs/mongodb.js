import mongoose from "mongoose";

// Connect to the MongoDB database
const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log('Database Connected'))
    await mongoose.connect(`${process.env.MONGODB_URI}/lms-copy`)
}

export default connectDB

// import mongoose from "mongoose";

// // Connect to the MongoDB database
// const connectDB = async () => {
//     try {
//         mongoose.connection.on('connected', () => console.log('Database Connected'));
//         await mongoose.connect(`${process.env.MONGODB_URI}/lms-copy`, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//     } catch (error) {
//         console.error('MongoDB connection error:', error);
//         process.exit(1);
//     }
// }