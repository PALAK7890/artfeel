import { useState } from "react";
import "../style/login.css";
import { useNavigate } from "react-router-dom";
import { FcAbout, FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data);
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Welcome back to ArtFeel 🎨💖");
      navigate("/");

    } catch (err) {
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>ArtFeel</h1>
        <p>Where emotions become art 🎨</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
           <div className="forgot">
            <span onClick={() => navigate("/forgot-password")}>
              Forgot password?
            </span>
          </div>

          <button disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>


<div className="social-login"><div className="icons">
            <FcGoogle size={26} /> 
          <FaGithub size={26} /></div>
         
        </div>
        <span onClick={() => navigate("/register")}>
          Don’t have an account? Sign up
        </span>
      </div>
    </div>
  );
}
