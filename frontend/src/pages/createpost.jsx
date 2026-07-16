import { useState, useEffect } from "react";
import "../assets/styles/signup.css";
import { useNavigate } from "react-router-dom";
import { fetchUserDetails } from "../utils/fetchUsers";

export function CreatePost({ user, setUser, loggedin }) {
  const Navigate = useNavigate();

  //setting form variables and states
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState("");

  //use effect to grab user details if logged in
  useEffect(() => {
    fetchUserDetails({ setUser, setError });

    if (loggedin) {
      fetchUserDetails({ setUser, setError });
    }
  }, [loggedin]);

  //handling form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handling form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    //api call to create user
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/createpost/${user?.id}`,
        {
          method: "POST",
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
        throw new Error("Post creation failed");
      }

      alert("Post created!");
      Navigate("/posts");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  //rendering form
  return (
    <div className="form-container">
      <h2>Create Post</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} method="POST" className="signup-form">
        {/*form inputs*/}
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

        {/*button*/}
        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
