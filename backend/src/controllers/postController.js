import {
  createPost,
  getAllPosts,
  searchPostsByTitle,
  editPost,
  deletePost,
  getPoster,
} from "../model/postQueries.js";
import { pool } from "../model/pool.js";

//helper funcitons to validate text legnth
function validateContent(text) {
  if (typeof text === 'string' && text.length <= 500) {
    return true;
  }
  return false;
}

function validateTitle(text) {
  if (typeof text === 'string' && text.length <= 75) {
    return true;
  }
  return false;
}


//controller to create a new post
export const createPostController = async (req, res) => {
  const { title, content } = req.body;
  const poster = req.params.id;

  //error handling for missing fields and validation
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  if (!poster) {
    return res.status(400).json({ error: "Poster is required" });
  }

  if (!validateTitle(title)) {
    return res.status(400).json({ error: "Title must be 75 characters or less" });
  }

  if (!validateContent(content)) {
    return res.status(400).json({ error: "Content must be 500 characters or less" });
  }

  //creating post
  try {
    const newPost = await createPost(poster, title, content);
    res.status(200).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create post" });
  }
};

//controller to get all posts
export const getAllPostsController = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

//controller to search  posts by title
export const searchPostsByTitleController = async (req, res) => {
  const { title } = req.params;
  try {
    const posts = await searchPostsByTitle(title);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to search posts" });
  }
};

//controller to edit a post
export const editPostController = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    //grabbing post
    const post = await pool.query("SELECT * FROM posts WHERE id = $1", [
      req.params.id,
    ]);

    // ownership check
    if (String(req.user.id) !== String(post.rows[0].poster)) {
      return res.status(403).json({
        message: "Unauthorized: you cannot manipulate this post.",
      });
    }

    //error handling for missing fields and validation
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    if (!validateTitle(title)) {
      return res.status(400).json({ error: "Title must be 75 characters or less" });
    }

    if (!validateContent(content)) {
      return res.status(400).json({ error: "Content must be 500 characters or less" });
    }

    const updatedPost = await editPost(id, title, content);
    res.json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to edit post" });
  }
};

//controller to delete a post
export const deletePostController = async (req, res) => {
  const { id } = req.params;
  try {
    //grabbing post
    const post = await pool.query("SELECT * FROM posts WHERE id = $1", [
      req.params.id,
    ]);

    // ownership check
    if (String(req.user.id) !== String(post.rows[0].poster)) {
      return res.status(403).json({
        message: "Unauthorized: you cannot manipulate this post.",
      });
    }
    await deletePost(id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete post" });
  }
};

//controller to get poster data for a post
export const getPosterDataController = async (req, res) => {
  const { id } = req.params;
  try {
    const posterData = await getPoster(id);

    if (!posterData) {
      res.status(500).json({ message: "Deleted user" });
    }

    res.json(posterData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch poster" });
  }
};
