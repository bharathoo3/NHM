import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove stored user data
    navigate("/"); // Redirect to home
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">NewsHub</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/submit-news">Submit News</Link>
        {user ? (
          <button onClick={handleLogout} className="auth-button">
            Logout
          </button>
        ) : (
          <button onClick={() => navigate("/login")} className="auth-button">
            Login / Register
          </button>
        )}
      </div>
    </nav>
  );
}
