import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import "./App.css";

// App component defines the routing for different pages
function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the landing page */}
        <Route path="/" element={<LandingPage />} />
        {/* Route for the sign-up page */}
        <Route path="/signup" element={<SignUp />} />
        {/* Route for the home page */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
