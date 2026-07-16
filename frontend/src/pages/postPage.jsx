import "../assets/styles/posts.css";
import { useState, useEffect } from "react";

function Postpage({ loggedin }) {
  //setting states
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

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

 //rendering posts
  return (
    <div className="postpage">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {posts.map((post) => (
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

          {/*when working on the edit and delete buttons for the post make sure buttons only appear if user is logged in and owns the post*/}
        </div>
      ))}
    </div>
  );
}

export default Postpage;
