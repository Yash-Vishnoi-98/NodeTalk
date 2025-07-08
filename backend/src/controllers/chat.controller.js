import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    // console.log("Request to get Stream token for user:", req.user.id);
    const token = generateStreamToken(req.user.id);
    // console.log("Generated Stream token:", token);
    res.status(200).json({ token});
  } catch (error) {
    console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}