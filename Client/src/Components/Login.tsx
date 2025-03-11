import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import auth from "../utils/auth";
import { login } from "../api/authAPI"

interface LoginInfo {
  username: string;
  password: string;
}

const UserLogin: React.FC = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    username: "",
    password: "",
  });

  const [loginCheck, setLoginCheck] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true); 
      navigate("./Knowledgelevel") 
    }
  };

  useEffect(() => {
    checkLogin();  // Call checkLogin() function to update loginCheck state
  }, [loginCheck]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!loginInfo.username.trim() || !loginInfo.password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    login(loginInfo)
    setError(null);
    console.log("Logging in with:", loginInfo);
  };

  return (
    <div className="container">
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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

      <p>Don't have an account?<Link to="/signup"> Create Account!</Link></p>
    </div>
  );
};

export default UserLogin;