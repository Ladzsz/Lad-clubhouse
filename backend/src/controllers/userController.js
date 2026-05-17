import { createUser, updateUser, deleteUser, saveResetToken } from "../model/userQueries.js";
import { generateResetToken, sendResetEmail } from "../utils/emailService.js";
import { pool } from "../model/pool.js";

//create user controller
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
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
  const userId = req.params.id;
  const { email } = req.body;

  try {

    //get token and expires
    const { token, hashedToken, expires } = generateResetToken();

    //save token and expires to db
    await saveResetToken(userId, hashedToken, expires);

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