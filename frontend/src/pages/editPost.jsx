import { useState, useEffect } from "react";
import "../assets/styles/signup.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { fetchUserDetails } from "../utils/fetchUsers";

export function Editpost({ setUser, loggedin }) {
  //states and variables
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const post = location.state?.post;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState("");

  //use effect to grab user details
  useEffect(() => {
    fetchUserDetails({ setUser, setError });

    if (loggedin) {
      fetchUserDetails({ setUser, setError });
    }
  }, [loggedin]);

  //use effect to grab form data
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        content: post.content || "",
      });
    }
  }, [post]);

  //handling form data change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //updating post data
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/editpost/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title: formData.title,
            content: formData.content,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Post update failed");
      }

      alert("Post updated!");
      navigate("/posts");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  //rendering form
  return (
    <div className="form-container">
      <h2>Edit Post</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-input-container">
          <div className="form-heading">
            <label htmlFor="title">Title:</label>
            <p>({formData.title.length} / 75)</p>
          </div>

          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength="75"
          />
        </div>

        <div className="form-input-container">
          <div className="form-heading">
            <label htmlFor="content">Content:</label>
            <p>({formData.content.length} / 500)</p>
          </div>

          <textarea
            id="content"
            name="content"
            className="createpost-textarea"
            value={formData.content}
            onChange={handleChange}
            required
            maxLength="500"
          />
        </div>

        <button type="submit" className="form-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Editpost;
