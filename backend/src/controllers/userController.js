import {
  getUserData,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../model/userQueries.js";

//get user controller
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const userData = await getUserData(userId);

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(userData);
  } catch (err) {
    console.error("error:", err);
    return res.status(500).json({
      error: "An error occurred while fetching user data",
    });
  }
};

//create user controller
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await createUser(username, email, password);
    res.status(201).json(newUser);
  } catch (err) {
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
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

//delete user controller
export const removeUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await deleteUser(userId);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

//login user controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to login" });
  }
};
