import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MONGODB_URI=mongodb+srv://Dababy:Matefi%26Istvan3@mobileapp.mxntg0a.mongodb.net/local?retryWrites=true&w=majority

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
