import express from "express";
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
router.post("/createpost/:id", createPostController);
router.put("/editpost/:id", editPostController);
router.delete("/deletepost/:id", deletePostController);

export default router;
