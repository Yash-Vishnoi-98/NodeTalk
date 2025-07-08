import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  signup, 
  login,
  logout,
  onboard,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout); //post are those that changes the server state since it destroy session so post method instead of Get method

router.post("/onboarding", protectRoute, onboard);

// check if user logged in or not
router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({
    success: true,
    message: "User Data",
    user: req.user,
  });
});





export default router;
