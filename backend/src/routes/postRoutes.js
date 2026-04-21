import express from "express";
import { createPostController, getAllPostsController, searchPostsByTitleController  } from "../controllers/postController.js";
const router = express.Router();

router.post("/createpost/:id", createPostController);
router.get("/", getAllPostsController);
router.get("/search/:title", searchPostsByTitleController);

export default router;
