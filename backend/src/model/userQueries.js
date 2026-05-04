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
export const updateUser = async (userId, username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const res = await pool.query(
    "UPDATE users SET username = $2, email = $3, password = $4, updatedat = NOW() WHERE id = $1 RETURNING *",
    [userId, username, email, hashedPassword],
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
