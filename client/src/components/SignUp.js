import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        username,
        password,
        email,
      });
      if (response && response.data) {
        console.log("Sign up successful:", response.data);
        // Handle successful registration
        navigate("/login");
      } else {
        console.error("Sign up failed: Invalid response");
        // Handle registration error (e.g., display error message)
      }
    } catch (error) {
      console.error("Sign up failed:", error.message);
      // Handle registration error (e.g., display error message)
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSignUp}>
        <h1>Register</h1>
        <div className="input">
          <input
            className="one"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="one"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="one"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
        <div className="login">
          <p>
            Already have an account? <a href="/">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
