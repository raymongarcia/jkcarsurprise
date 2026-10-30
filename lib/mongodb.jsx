import mongoose from "mongoose";

export const connectMongoDB = async () => {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error(
            "Missing MONGODB_URI. Add it to your .env.local file, e.g. MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/jkcarsurprise"
        );
    }

    if (mongoose.connection.readyState === 1) {
        return;
    }

    try {
        await mongoose.connect(uri);
        console.log("connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        throw error;
    }
};