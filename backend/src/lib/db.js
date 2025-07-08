import mongoose from "mongoose";
 
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
     
    console.log(`Mongodb Connected: ${conn.connection.host}`);
  } catch (e) {
    console.log("Error in connecting:", e);
    process.exit(1);
    //  1 means FAILURE
  }
};
