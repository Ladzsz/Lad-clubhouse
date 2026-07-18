import "./App.css";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Postpage from "./pages/postPage";
import Forgotpass from "./pages/forgotpass";
import Resetpass from "./pages/resetpass";
import Footer from "./components/footer";
import AccountDetails from "./pages/accountdetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import CreatePost from "./pages/createpost";
import Editpost from "./pages/editPost";

function App() {
  const [loggedin, setloggedin] = useState(false);
  const [user, setUser] = useState(null);

  //setting login to true from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/users/me", {
      credentials: "include",
    })
      .then((res) => {
      if (res.ok) return res.json();
      throw new Error("Not authenticated");
    })
    .then((data) => {
      setloggedin(true);
      setUser(data.user);
    })
      .catch(console.error);
  }, []);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="content">
          <Routes>
            <Route index element={<Home loggedin={loggedin} />} />
            <Route
              path="/posts"
              element={
                <Postpage loggedin={loggedin} setUser={setUser} user={user} />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  setloggedin={setloggedin}
                  setUser={setUser}
                  user={user}
                />
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<Forgotpass />} />
            <Route path="/reset-password/:token" element={<Resetpass />} />
            <Route path="/createpost" element={<CreatePost user={user} />} />
            <Route path="/editpost" element={<Editpost user={user} loggedin={loggedin} setUser={setUser} />} />
            <Route
              path="/accountdeets"
              element={
                <AccountDetails
                  setloggedin={setloggedin}
                  loggedin={loggedin}
                  setUser={setUser}
                  user={user}
                />
              }
            />
          </Routes>
        </main>
        <Footer loggedin={loggedin} />
      </div>
    </BrowserRouter>
  );
}

export default App;
