import { useState, ChangeEvent, FormEvent } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/authAPI";

interface LoginInfo {
  username: string;
  password: string;
}

const UserLogin: React.FC = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Check if both fields are filled out
    if (!loginInfo.username.trim() || !loginInfo.password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Await the response from the login API call
      const data = await login(loginInfo);
      
      // Store the token in localStorage for later use
      localStorage.setItem("token", data.token);
      console.log("Token stored:", data.token);

      // Clear any previous error and navigate to the desired page
      setError(null);
      navigate("/knowledge-level");
    } catch (err) {
      console.error("Error during login:", err);
      setError("Could not fetch user info");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          className="username-input"
          type="text"
          name="username"
          placeholder="Username"
          value={loginInfo.username}
          onChange={handleChange}
        />
        <input
          className="password-input"
          type="password"
          name="password"
          placeholder="Password"
          value={loginInfo.password}
          onChange={handleChange}
        />
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
      <p>
        Don't have an account?
        <Link to="/signup"> Create Account!</Link>
      </p>
    </div>
  );
};

export default UserLogin;
