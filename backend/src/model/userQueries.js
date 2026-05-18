import { pool } from "../model/pool.js";
import bcrypt from "bcryptjs";

//query to create user
export const createUser = async (
  username,
  email,
  password,
  is_member = true,
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const res = await pool.query(
    "INSERT INTO users (username, email, password, ismember) VALUES ($1, $2, $3, $4) RETURNING *",
    [username, email, hashedPassword, is_member],
  );

  return res.rows[0];
};

//query to update user
export const updateUser = async (userId, username) => {
  const res = await pool.query(
    "UPDATE users SET username = $2, updatedat = NOW() WHERE id = $1 RETURNING *",
    [userId, username],
  );
  return res.rows[0];
};

// query to delete user
export const deleteUser = async (userId) => {
  const res = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [
    userId,
  ]);
  return res.rows[0];
};

//query to save reset token and expires
export const saveResetToken = async (email, hashedToken, expires) => {
  await pool.query(
    "UPDATE users SET hashed_token = $2, token_expires_at = $3 WHERE email = $1",
    [email, hashedToken, expires],
  );
};

//update password query
export const updatePassword = async (userId, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await pool.query(
    "UPDATE users SET password = $2, hashed_token = NULL, token_expires_at = NULL WHERE id = $1",
    [userId, hashedPassword],
  );
};
