import React from "react";
import Login from "./Login";

// LandingPage component displays the landing page content
const LandingPage = () => {
  return (
    <div>
      {/* Header */}
      <header>
        <img
          src="images/Taskifier.jpg"
          alt="Taskifier Logo"
          width={100}
          height={100}
        />
        <h1>TASKIFIER</h1>
      </header>
      {/* Main content */}
      <div className="content">
        <h2>Welcome to TASKIFIER</h2>
        <p>To get started please login</p>
        {/* Render Login component */}
        <Login />
      </div>
    </div>
  );
};

export default LandingPage;
