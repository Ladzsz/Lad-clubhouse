//user routes
const express = require("express");
const router = express.Router();

// Get all posts
router.get("/", (req, res) => {
  res.json({ message: "Get all posts" });
});

module.exports = router;