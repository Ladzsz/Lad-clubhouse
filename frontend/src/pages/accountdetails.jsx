import "../assets/styles/accountdeets.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AccountDetails({ setloggedin, loggedin }) {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    //fetching user details from the backend
    async function fetchUserDetails() {
      try {
        const response = await fetch("http://localhost:5000/api/users", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Unable to load account details");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      }
    }

    if (loggedin) {
      fetchUserDetails();
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

          <div className="acc-btn-container">
            <div className="account-deets-item">
              <p className="editbtn btn">Edit account</p>
            </div>

            <div className="account-deets-item">
              <p className="deletebtn btn">delete account</p>
            </div>

            <div className="account-deets-item">
              <p className="logoutbtn btn" onClick={handleLogout}>
                Logout
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AccountDetails;
