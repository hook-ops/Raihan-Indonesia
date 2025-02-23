//  Database Connect 02/21/2025 Raihan Hafiz
import mongoose from 'mongoose';

let isConnected = false;

export async function dbConnect() {
    if (isConnected) return;

    if (!process.env.MONGO_URI) {
        throw new Error('Please define the MONGO_URI environment variable in .env.local');
      }
    

    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        isConnected = true;
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection error", error);
    }
}