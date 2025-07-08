import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;
if (!apiKey || !apiSecret) {
  console.error("Please set STREAM_API_KEY and STREAM_API_SECRET in .env file");
  process.exit(1);
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  // upsert means if user exist then update it else create new user
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (e) {
    console.log("Error is-->", e);
  }
};

export const generateStreamToken =  (userId) => {
  try {
    // ensure userid is string
    const userIdStr = userId.toString();
    const token =  streamClient.createToken(userIdStr);
    return token;
  } catch (e) {
    console.error("Error generating Stram Token", e);
  }
};
