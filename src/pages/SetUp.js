// src/pages/SetUp.js
import React from "react";
import Navbar from "../components/Navbar";
import RafflePreview from "../components/RafflePreview";
import CustomizationToolbar from "../components/CustomizationToolbar";

const SetUp = () => {
  return (
    <div>
      <Navbar />
      <div className="setup-container">
        <CustomizationToolbar />
        <RafflePreview />
      </div>
    </div>
  );
};

export default SetUp;
