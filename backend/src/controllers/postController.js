import { createPost } from "../model/postQueries.js";

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