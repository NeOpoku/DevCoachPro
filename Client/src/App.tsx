import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'

function App() {
  

  return (
   <Router>
      <Routes>
        <Route path="/" element={<LogIn/>}/>
        <Route path="./components/KnowledgeLevel" element={<KnowledgeLevel/>}/>
        <Route path="./components/Quiz" element={<Quiz/>}/>
        <Route path="./components/Results" element={<Results/>}/>
      </Routes>







   </Router>
  )
}

export default App

