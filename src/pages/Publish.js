// src/pages/Publish.js
import React from "react";
import Navbar from "../components/Navbar";

const Publish = () => {
  return (
    <div>
      <Navbar />
      <h2>Publish Options</h2>
      <div className="publish-options">
        <div>Create A Post</div>
        <div>Create A Landing Page</div>
        <div>Insert Raffle</div>
      </div>
    </div>
  );
};

export default Publish;
