import { pool } from "../model/pool.js";

//query to create post by id
export const createPost = async (poster, title, content) => {
    const res = await pool.query(
        "INSERT INTO posts (poster, title, content) VALUES ($1, $2, $3) RETURNING *",
        [poster, title, content]
    );
    return res.rows[0];
};

//query to get all posts
export const getAllPosts = async () => {
    const res = await pool.query("SELECT * FROM posts");
    return res.rows;
};

//query to search posts by title
export const searchPostsByTitle = async (title) => {
    const res = await pool.query(
        "SELECT * FROM posts WHERE title ILIKE $1",
        [`%${title}%`]
    );
    return res.rows;
};