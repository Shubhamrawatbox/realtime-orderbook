import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...", process.env.DB_URL);
    const connectionInstance = await mongoose.connect(process.env.DB_URL);
    console.log(`\n Mongodb:-- DB Host ${connectionInstance.connection.host}`);
  } catch (err) {
    console.error("Error in connectToDatabase:", err);
    process.exit(1);
  }
};

export default connectToDatabase;
