import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Signup.css";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup details:", { username, email, password });
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Create an Account</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          className="signup-input"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          className="signup-input"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="signup-input"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
      <div className="signup-links">
      <p>Already have an account? <Link to="/">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
