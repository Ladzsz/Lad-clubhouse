import "../assets/styles/navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="navImg">
          <img
            src="/images/angrylogo.webp"
            className="navimg1"
            alt="logo image"
          />
        </div>
        <ul>
          <Link to="/"><li className="btn navbtn navtext">Home</li></Link>
          <Link to="posts"><li className="btn navbtn navtext">Posts</li></Link>
        </ul>
        <div className="navImg">
          <img
            src="/images/angrylogo2.webp"
            className="navimg2"
            alt="logo image"
          />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
