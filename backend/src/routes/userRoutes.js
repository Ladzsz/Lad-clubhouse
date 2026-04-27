import express from "express";
import { ensureAuthenticated } from "../config/passport.js";
import {
  getUserProfile,
  registerUser,
  editUserProfile,
  removeUser,
  login,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile/:id", ensureAuthenticated, getUserProfile);
router.post("/register", registerUser);
router.put("/profile/:id", ensureAuthenticated, editUserProfile);
router.delete("/profile/:id", ensureAuthenticated, removeUser);
router.post("/login", login);

export default router;
