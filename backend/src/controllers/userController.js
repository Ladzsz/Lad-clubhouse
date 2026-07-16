import {
  createUser,
  updateUser,
  deleteUser,
  saveResetToken,
  updatePassword,
  getUserDetails,
} from "../model/userQueries.js";
import { generateResetToken, sendResetEmail } from "../utils/emailService.js";
import { pool } from "../model/pool.js";
import crypto from "crypto";

function validateUser(text) {
  if (typeof text === "string" && text.length <= 24) {
    return true;
  }
  return false;
}

export const getUserDetailsController = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await getUserDetails(userId);
    res.json(userDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
};

//create user controller
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!validateUser(username)) {
    return res
      .status(400)
      .json({ error: "Title must be 24 characters or less" });
  }

  try {
    const newUser = await createUser(username, email, password);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
};

//update user controller
export const editUserProfile = async (req, res) => {
  const userId = req.params.id;
  const { username } = req.body;

  if (!validateUser(username)) {
    return res
      .status(400)
      .json({ error: "Title must be 24 characters or less" });
  }

  try {
    // check user
    if (String(req.user.id) !== String(req.params.id)) {
      return res.status(403).json({
        message: "Unauthorized: you cannot manipulate this post.",
      });
    }

    const updatedUser = await updateUser(userId, username);
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user" });
  }
};

//delete user controller
export const removeUser = async (req, res) => {
  const userId = req.params.id;
  try {
    // check user
    if (String(req.user.id) !== String(req.params.id)) {
      return res.status(403).json({
        message: "Unauthorized: you cannot manipulate this post.",
      });
    }

    await deleteUser(userId);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

//send reset password controller
export const sendresetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    //get token and expires
    const { token, hashedToken, expires } = generateResetToken();

    //save token and expires to db
    await saveResetToken(email, hashedToken, expires);

    // send token to email
    await sendResetEmail(email, token);

    res.json({
      message: "If email exists reset email sent",
    });
  } catch (err) {
    console.error(err);

    res.json({
      message: "If email exists reset email sent",
    });
  }
};

//confirm password reset controller
export const confirmResetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const token = req.params.token;

  try {
    // hash incoming token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // find matching token
    const result = await pool.query(
      `
      SELECT id, token_expires_at
      FROM users
      WHERE hashed_token = $1
      `,
      [hashedToken],
    );

    // invalid token
    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid reset token",
      });
    }

    const user = result.rows[0];

    // expired token
    if (new Date(user.token_expires_at) < new Date()) {
      return res.status(400).json({
        message: "Reset token expired",
      });
    }

    // update password
    await updatePassword(user.id, newPassword);

    res.json({
      message: "Password reset successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to reset password" });
  }
};
