import "../assets/styles/posts.css";
import { useState, useEffect } from "react";
import { fetchUserDetails } from "../utils/fetchUsers";

function Postpage({ loggedin, user, setUser }) {
  //setting states
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [editing, setEditing] = useState(false);
  const [newPostcontent, setpostcontent] = useState("");

  //use effect tov grab post data
  useEffect(() => {
    const fetchPosts = async () => {
      setError("");
      try {
        const response = await fetch("http://localhost:5000/api/posts");
        if (!response.ok) throw new Error("uh oh no posts to display :(");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      }
    };

    fetchPosts();
  }, []);

  //use effect to grab user details if logged in
    useEffect(() => {
      fetchUserDetails({ setUser, setError });
  
      if (loggedin) {
        fetchUserDetails({ setUser, setError });
      }
    }, [loggedin]);

  //pagination calculations
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  //pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //handle delete post
  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete your Post?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/deletepost/${postId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (response.ok) {
        alert("Post deleted successfully");
        setPosts(posts.filter((post) => post.id !== postId));
      } else {
        setError("Failed to delete Post");
      }
    } catch (err) {
      setError(err.message || "Failed to delete Post");
    }
  };

  //rendering posts
  return (
    <div className="postpage">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {currentPosts.map((post) => (
        <div className="postcard" key={post.id}>
          <h1 className="postcard-title">{post.title}</h1>
          <div className="postcard-content">
            <p>{post.content}</p>
          </div>

          {loggedin ? (
            <div className="postcard-footer">
              <p>posted by: {post.poster_username || "unknown"}</p>
              <p>
                user joined:{" "}
                {post.poster_createdat
                  ? new Date(post.poster_createdat).toLocaleDateString()
                  : "unknown"}
              </p>
            </div>
          ) : (
            <div className="postcard-footer">
              <p>please login to see the screecher!</p>
            </div>
          )}

          {/*edit and delete buttons*/}
          {loggedin && String(user?.id) === String(post.poster) ? (
            <div className="post-btns">
              <button className="btn">Edit</button>
              <button className="btn" onClick={() => handleDeletePost(post.id)}>
                Delete
              </button>
            </div>
          ) : null}
        </div>
      ))}

      {/* pagination controls */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            className="btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            className="btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Postpage;
