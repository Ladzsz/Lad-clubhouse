import { createUser, updateUser, deleteUser } from "../model/userQueries.js";

//create user controller
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await createUser(username, email, password);
    res.status(201).json(newUser);
  } catch {
    res.status(500).json({ error: "Failed to create user" });
  }
};

//update user controller
export const editUserProfile = async (req, res) => {
  const userId = req.params.id;
  const { username, email, password } = req.body;
  try {
    const updatedUser = await updateUser(userId, username, email, password);
    res.json(updatedUser);
  } catch {
    res.status(500).json({ error: "Failed to update user" });
  }
};

//delete user controller
export const removeUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await deleteUser(userId);
    res.json({ message: "User deleted successfully" });
  } catch {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
