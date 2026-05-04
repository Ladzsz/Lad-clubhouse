import { pool } from "../model/pool.js";

//query to create post by id
export const createPost = async (poster, title, content) => {
  const res = await pool.query(
    "INSERT INTO posts (poster, title, content) VALUES ($1, $2, $3) RETURNING *",
    [poster, title, content],
  );
  return res.rows[0];
};

//query to get poster data for a post
export const getPoster = async (postId) => {
  const query = `SELECT users.username, users.createdat
        FROM users
        LEFT JOIN posts ON users.id = posts.poster
        WHERE posts.id = $1;`;
  const values = [postId];
  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}

//query to get all posts
export const getAllPosts = async () => {
  const res = await pool.query("SELECT * FROM posts");
  return res.rows;
};

//query to search posts by title
export const searchPostsByTitle = async (title) => {
  const res = await pool.query("SELECT * FROM posts WHERE title ILIKE $1", [
    `%${title}%`,
  ]);
  return res.rows;
};

//query to edit posts
export const editPost = async (id, title, content) => {
  const res = await pool.query(
    "UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *",
    [title, content, id],
  );
  return res.rows[0];
};

//query to delete post
export const deletePost = async (id) => {
  const res = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [
    id,
  ]);
  return res.rows[0];
};
