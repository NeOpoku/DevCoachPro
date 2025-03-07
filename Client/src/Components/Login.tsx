import { useState, ChangeEvent, FormEvent } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";

const loggedIn: boolean = true;

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

  const handleRedirect = (): void => {
    if (loggedIn) {
      navigate("/Knowledge-Level");
    } else {
      setError("Please log in!");
    }
  };

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

    setError(null);
    console.log("Logging in with:", loginInfo);
    handleRedirect();
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

      <p>Don't have an account?<Link to="/Signup"> Create Account!</Link></p>
    </div>
  );
};

export default UserLogin;