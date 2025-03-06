import "./styles/styles.css";

const App: React.FC = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <h1>{`{DevCoachPro}`}</h1>
        </div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Services</a>
          <a href="#">Get Started</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <h1 className="hero-title">Ace Your Coding Interviews</h1>
          <p className="hero-description">
            Welcome to DevCoachPro, your ultimate AI-powered coding interview coach. Elevate your skills with personalized feedback and engaging challenges designed to help you succeed.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-start">Start Now</button>
            <button className="btn btn-learn">Learn More</button>
          </div>
        </div>
        <div className="hero-right">
          {/* Add AI Image Here */}
          <img src="/src/styles/DevCoachPro.png" alt="Logo" width="400px"/>

        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 DevCoachPro. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
