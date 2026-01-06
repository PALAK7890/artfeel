import { useState } from "react"
import "../style/login.css";     
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Account created 💖");
      navigate("/login");
    } else {
      alert(data);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>ArtFeel</h1>
        <p>Create your art journal 🎨</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full name"
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <button>Sign up</button>
        </form>

        <div className="social-login">
          <div className="icons">
            <FcGoogle size={26} />
            <FaGithub size={26} />
          </div>
        </div>

        <div className="register-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </div>
      </div>
    </div>
  );
}
