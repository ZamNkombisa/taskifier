import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });
      // Handle successful login
      console.log("Login successful:", response.data);

      // Redirect to home page after successful login
      navigate("/home"); // Use navigate function to redirect
    } catch (error) {
      // Handle login error (e.g., display error message)
      console.error("Login failed:", error.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input">
          <input
            className="one"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="one"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <div className="register">
          <p>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
