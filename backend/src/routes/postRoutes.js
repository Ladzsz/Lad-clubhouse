import express from "express";
import { ensureAuthenticated } from "../config/passport.js";
import {
  createPostController,
  getAllPostsController,
  searchPostsByTitleController,
  editPostController,
  deletePostController,
} from "../controllers/postController.js";
const router = express.Router();

router.get("/", getAllPostsController);
router.get("/search/:title", searchPostsByTitleController);
router.post("/createpost/:id", ensureAuthenticated, createPostController);
router.put("/editpost/:id", ensureAuthenticated, editPostController);
router.delete("/deletepost/:id", ensureAuthenticated, deletePostController);

export default router;
