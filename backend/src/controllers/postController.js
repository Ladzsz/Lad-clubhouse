import {
  createPost,
  getAllPosts,
  searchPostsByTitle,
  editPost,
  deletePost,
  getPoster,
} from "../model/postQueries.js";

//controller to create a new post
export const createPostController = async (req, res) => {
  const { title, content } = req.body;
  const poster = req.params.id;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  if (!poster) {
    return res.status(400).json({ error: "Poster is required" });
  }

  try {
    const newPost = await createPost(poster, title, content);
    res.status(200).json(newPost);
  } catch {
    res.status(500).json({ error: "Failed to create post" });
  }
};

//controller to get all posts
export const getAllPostsController = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

//controller to search  posts by title
export const searchPostsByTitleController = async (req, res) => {
  const { title } = req.params;
  try {
    const posts = await searchPostsByTitle(title);
    res.json(posts);
  } catch {
    res.status(500).json({ error: "Failed to search posts" });
  }
};

//controller to edit a post
export const editPostController = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedPost = await editPost(id, title, content);
    res.json(updatedPost);
  } catch {
    res.status(500).json({ error: "Failed to edit post" });
  }
};

//controller to delete a post
export const deletePostController = async (req, res) => {
  const { id } = req.params;
  try {
    await deletePost(id);
    res.json({ message: "Post deleted successfully" });
  } catch {
    res.status(500).json({ error: "Failed to delete post" });
  }
};

//controller to get poster data for a post
export const getPosterDataController = async (req, res) => {
  const { id } = req.params;
  try {
    const posterData = await getPoster(id);
    res.json(posterData);
  } catch {
    res.status(500).json({ error: "Failed to fetch poster" });
  }
};
