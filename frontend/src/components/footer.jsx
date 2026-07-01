import { Link } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import '../assets/styles/footer.css';

function Footer({ loggedin }) {
  return (
    <>
      <footer>
        {loggedin ? (
          <Link to="/accountdeets">
            <FaUserCircle size={50} className="user-icon" />
          </Link>
        ) : (
          <div>
            <p>Login to view account</p>
          </div>
        )}
      </footer>
    </>
  );
}

export default Footer;
