import "../assets/styles/home.css";
import { useState, useEffect } from "react";

function AccountDetails({ loggedin }) {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
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

  return (
    <>
      <section className="account-deets-sec">
        <h1>Account Details</h1>
        {error && <p className="error">{error}</p>}
        <div className="account-deets-item">
          <p>
            Username: {loggedin ? user?.username || "Loading..." : "Not logged in"}
          </p>
          <p>
            Account Created: {loggedin ? user?.createdat || "Loading..." : ""}
          </p>
        </div>
      </section>
    </>
  );
}

export default AccountDetails;
