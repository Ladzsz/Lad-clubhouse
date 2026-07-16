import "../assets/styles/accountdeets.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserDetails } from "../utils/fetchUsers";

function AccountDetails({ setloggedin, loggedin, user, setUser }) {
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const navigate = useNavigate();

  //use effect to grab user details if logged in
  useEffect(() => {
    fetchUserDetails({ setUser, setError });

    if (loggedin) {
      fetchUserDetails({ setUser, setError });
    }
  }, [loggedin]);

  //handling logout
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setloggedin(false);
        alert("logged out successfully");
        navigate("/login");
      } else {
        setError("Logout failed");
      }
    } catch (err) {
      setError(err.message || "Logout error");
    }
  };

  //handling edit click
  const handleEditClick = () => {
    setNewUsername(user?.username || "");
    setEditing(true);
  };

  //handle saving edit
  const handleSaveEdit = async () => {
    if (!newUsername.trim()) {
      setError("Username cannot be empty");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/profile/${user?.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: newUsername,
          }),
        },
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setEditing(false);
        setUser(updatedUser);
        alert("Profile updated successfully");
      } else {
        setError("Failed to update profile");
      }
    } catch (err) {
      setError(err.message || "Failed to update profile");
    }
  };

  //handle cancel edit
  const handleCancel = () => {
    setEditing(false);
    setNewUsername("");
  };

  //handle delete account
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/profile/${user?.id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (response.ok) {
        setloggedin(false);
        setUser(null);
        alert("Account deleted successfully");
        navigate("/signup");
      } else {
        setError("Failed to delete account");
      }
    } catch (err) {
      setError(err.message || "Failed to delete account");
    }
  };

  return (
    <>
      {/*rendering the account details page*/}
      <section className="account-deets-sec">
        <h1>Account Details</h1>
        {error && <p className="error">{error}</p>}
        <div className="item-container">
          <div className="account-deets-item">
            <p className="acc-details-info">
              Username:{" "}
              {loggedin ? user?.username || "Loading..." : "Not logged in"}
            </p>
            <p>
              Account Created: {loggedin ? user?.createdat || "Loading..." : ""}
            </p>
          </div>

          {editing ? (
            <div className="account-deets-item">
              <div className="form-heading">
                <label htmlFor="new-username" className="edit-label">
                  Edit username
                </label>

                <p>({newUsername.length} / 24)</p>
              </div>
              <input
                id="new-username"
                type="text"
                placeholder="enter new username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                maxLength="24"
              />
              <button className="btn" onClick={handleSaveEdit}>
                Save Changes
              </button>
              <button className="btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          ) : (
            <div className="acc-btn-container">
              <div className="account-deets-item">
                <p className="editbtn btn" onClick={handleEditClick}>
                  Edit account
                </p>
              </div>

              <div className="account-deets-item">
                <p className="deletebtn btn" onClick={handleDeleteAccount}>
                  delete account
                </p>
              </div>

              <div className="account-deets-item">
                <p className="logoutbtn btn" onClick={handleLogout}>
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default AccountDetails;
