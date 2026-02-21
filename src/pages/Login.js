import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";
export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    // save token + role
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    navigate("/dashboard");

  } catch (err) {
    alert("Login failed");
  }
};

  return (
    <div className="container">
      <div className="card">

        <h2>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}