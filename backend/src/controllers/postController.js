import { createPost, getAllPosts, searchPostsByTitle } from "../model/postQueries.js";

//controller to create a new post
export const createPostController = async (req, res) => {
    const { title, content } = req.body;
    const poster = req.params.id; 
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