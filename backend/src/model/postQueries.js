import { pool } from "../model/pool.js";

//query to create post by id
export const createPost = async (poster, title, content) => {
    const res = await pool.query(
        "INSERT INTO posts (poster, title, content) VALUES ($1, $2, $3) RETURNING *",
        [poster, title, content]
    );
    return res.rows[0];
};