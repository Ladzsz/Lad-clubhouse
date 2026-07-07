export async function fetchUserDetails({ setUser, setError } = {}) {
  //grabbing user details
  try {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    //error handling
    if (!response.ok) {
      throw new Error("Unable to load account details");
    }

    //setting user details
    const data = await response.json();
    if (typeof setUser === "function") setUser(data);
    return data;
  } catch (err) {
    const message = err.message || "Something went wrong";
    if (typeof setError === "function") setError(message);
    throw err;
  }
}
