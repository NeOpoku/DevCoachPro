import { useState } from "react";

const userLogin = () => {
  const [LoginInfo, SetLoginInfo] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    SetLoginInfo({
      ...LoginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", userLogin);
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          className='username-input'
          type="text"
          name="username"
          placeholder="Username"
          value={userLogin.username}
          onChange={handleChange}
        />
        <input
          className='password-input'
          type="password"
          name="password"
          placeholder="Password"
          value={userLogin.password}
          onChange={handleChange}
        />
        <button className='submit-button' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default userLogin;
