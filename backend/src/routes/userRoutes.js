import express from "express";
import passport from "passport";
import { ensureAuthenticated } from "../config/passport.js";
import {
  registerUser,
  editUserProfile,
  removeUser,
  sendresetPassword,
  confirmResetPassword,
  getUserDetailsController,
} from "../controllers/userController.js";

const router = express.Router();
router.get("/", ensureAuthenticated, getUserDetailsController);

router.post("/register", registerUser);
router.post("/reset-password", sendresetPassword);
router.post("/confirm-reset-password/:token", confirmResetPassword);
router.put("/profile/:id", ensureAuthenticated, editUserProfile);
router.delete("/profile/:id", ensureAuthenticated, removeUser);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }

    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
        },
      });
    });
  })(req, res, next);
});
router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/me", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      authenticated: false,
    });
  }

  return res.json({
    authenticated: true,
    user: {
      id: req.user.id,
      email: req.user.email,
    },
  });
});

export default router;
