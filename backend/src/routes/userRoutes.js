import express from "express";
import {
  getUserProfile,
  registerUser,
  editUserProfile,
  removeUser,
  login,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile/:id", getUserProfile);
router.post("/register", registerUser);
router.put("/profile/:id", editUserProfile);
router.delete("/profile/:id", removeUser);
router.post("/login", login);

export default router;
