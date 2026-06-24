import { useState } from "react";
import "../assets/styles/signup.css";
import { Link, useNavigate } from "react-router-dom";

export function Login({ setloggedin }) {
  //setting form variables and states
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //handling form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handling form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    //api call to login user
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      if (response.ok) {
        setloggedin(true);
      }
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  //rendering form
  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} method="POST" className="signup-form">
        {/*form inputs*/}
        <div className="form-input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/*button*/}
        <button type="submit" className="form-btn">
          Submit
        </button>

        {/*forgot pass link*/}
        <Link to="/forgot-password">
          <li className="forgot-pass-link">forgot password?</li>
        </Link>
      </form>
    </div>
  );
}

export default Login;
