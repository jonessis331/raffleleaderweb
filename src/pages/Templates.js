// src/pages/Templates.js
import React from "react";
import Navbar from "../components/Navbar";
import CarouselList from "../components/CarouselList";

const Templates = () => {
  const wireframes = ["Wireframe 1", "Wireframe 2", "Wireframe 3"];
  const userGenerated = ["User Generated 1", "User Generated 2"];

  return (
    <div>
      <Navbar />
      <h2>Templates Page</h2>
      <CarouselList title="Wireframes" items={wireframes} />
      <CarouselList title="User Generated" items={userGenerated} />
    </div>
  );
};

export default Templates;
