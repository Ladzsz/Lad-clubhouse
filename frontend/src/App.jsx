import "./App.css";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Postpage from "./pages/postPage";
import Forgotpass from "./pages/forgotpass";
import Resetpass from "./pages/resetpass";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [loggedin, setloggedin] = useState(false);

  //setting login to true from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/users/me", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setloggedin(true);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home loggedin={loggedin} />} />
        <Route path="/posts" element={<Postpage loggedin={loggedin} />} />
        <Route path="/login" element={<Login setloggedin={setloggedin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Forgotpass />} />
        <Route path="/reset-password/:token" element={<Resetpass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
