import { useState, ChangeEvent, FormEvent } from "react";
import "../styles/Login.css";


interface LoginInfo {
  username: string;
  password: string;
}

const UserLogin: React.FC = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", loginInfo);
  };

  return (
    <div className="container">
      <h1>Login</h1>
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
    </div>
  );
};

export default UserLogin;
