import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import cors from "cors";
import path from "path";   //come from node.js

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve(); // to get the current directory

app.use( 
  cors({
    origin: 'http://localhost:5173',
    credentials: true, //allow frontend to send the cookies
  })
);

app.use(express.json()); // to support JSON-encoded bodies
app.use(cookieParser());
 
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if(process.env.NODE_ENV === "production") {
  // it says take the dist folder from the frontend and convert it into static assests
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
// from the current directory which is backend we will go one above  and under frontend we will go in dist folder4

  // any routes another then the above routes 
  //  {
        //  app.use("/api/auth", authRoutes);
        // app.use("/api/users", userRoutes);
        // app.use("/api/chat", chatRoutes);
  //   }

  //  we should return our web application 

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  connectDB();
});
