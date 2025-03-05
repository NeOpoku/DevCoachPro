import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./Components/Login";
// import KnowledgeLevel from "./Components/KnowledgeLevel";
// import Quiz from "./Components/Quiz";
// import Results from "./Components/Results";
//import "./App.css";

function App() {

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        {/* <Route path="/knowledge-level" element={<KnowledgeLevel />} /> */}
        {/* <Route path="/quiz" element={<Quiz />} /> */}
        {/* <Route path="/results" element={<Results />} /> */}
        
      </Routes>
    </Router>
  );
}

export default App;
