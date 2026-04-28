import express from "express";
import passport from 'passport';
import { ensureAuthenticated } from "../config/passport.js";
import {
  getUserProfile,
  registerUser,
  editUserProfile,
  removeUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile/:id", ensureAuthenticated, getUserProfile);
router.post("/register", registerUser);
router.put("/profile/:id", ensureAuthenticated, editUserProfile);
router.delete("/profile/:id", ensureAuthenticated, removeUser);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


export default router;
