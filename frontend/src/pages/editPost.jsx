import { useState, useEffect } from "react";
import "../assets/styles/signup.css";
import { useNavigate } from "react-router-dom";
import { fetchUserDetails } from "../utils/fetchUsers";

export function Editpost({ user, setUser, loggedin }) {
  const Navigate = useNavigate();

  return (
    <div>
      <p>im the edit post page!</p>
    </div>
  );
}

export default Editpost;
