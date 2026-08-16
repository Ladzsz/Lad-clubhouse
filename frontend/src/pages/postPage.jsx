import "../assets/styles/posts.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Searchbar from "../components/searchbar";

function Postpage({ loggedin, user }) {
  //setting states
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  //use effect tov grab post data
  useEffect(() => {
    const fetchPosts = async () => {
      setError("");
      try {
        const response = await fetch("https://lad-clubhouse.onrender.com/api/posts");
        if (!response.ok) throw new Error("uh oh no posts to display :(");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      }
    };

    fetchPosts();
  }, []);

  //handle search function
  const handleSearch = async (term) => {
    setError("");
    setCurrentPage(1);

    //fallback if search is empty
    try {
      if (!term) {
        const response = await fetch("https://lad-clubhouse.onrender.com/api/posts");
        if (!response.ok) throw new Error("Failed to load posts");
        const data = await response.json();
        setPosts(data);
        return;
      }

      //actual search api call
      const response = await fetch(
        `https://lad-clubhouse.onrender.com/api/posts/search/${encodeURIComponent(term)}`,
      );
      if (!response.ok) throw new Error("No posts found :(");
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setPosts([]);
    }
  };

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
        `https://lad-clubhouse.onrender.com/api/posts/deletepost/${postId}`,
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

  // rendering posts
  return (
    <div className="postpage">
      <Searchbar onSearch={handleSearch} />
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

          {/* edit and delete buttons */}
          {loggedin && String(user?.id) === String(post.poster) && (
            <div className="post-btns">
              <Link
                to={`/editpost/${post.id}`}
                state={{ post }}
                className="btn"
              >
                Edit
              </Link>
              <button className="btn" onClick={() => handleDeletePost(post.id)}>
                Delete
              </button>
            </div>
          )}
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
