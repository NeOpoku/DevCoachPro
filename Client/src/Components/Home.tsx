import React, { useState } from "react";
import UserLogin from "./UserLogin";
import SignupModal from "./Signup";

const Home: React.FC = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to DevCoachPro</h1>
      <h2 className="home-subtitle">Where interviews are simplified</h2>
      <div className="auth-section">
        <UserLogin />
      </div>

      
      {isSignupOpen && <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />}
    </div>
  );
};

export default Home;
