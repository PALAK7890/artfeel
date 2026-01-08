import { useNavigate } from "react-router-dom";
import "../style/navbar.css";


export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
localStorage.removeItem("user");
navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 onClick={() => navigate("/")}>ArtFeel</h2>

      <div className="nav-links">
        <span onClick={() => navigate("/")}>Home</span>
        <span onClick={() => navigate("/explore")}>Explore</span>
        <span onClick={() => navigate("/upload")}>Upload</span>
        {user && <span onClick={() => navigate("/profile")}>Profile</span>}
      </div>

      <div className="nav-user">
        {user ? (
          <>
                  <span className="nav-bell" onClick={() => navigate("/inbox")}>
          🔔
        </span>

            <span className="username">Hi, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/signin")} className="signup">
              Sign up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
