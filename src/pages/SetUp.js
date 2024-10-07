// src/pages/SetUp.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CustomizationToolbar from "../components/CustomizationToolbar";
import Canvas from "../components/Canvas";
import ConfigurationPane from "../components/ConfigurationPane";
import "../styles/SetUp.css";

const SetUp = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [raffleWidth, setRaffleWidth] = useState(500);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const updateItem = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setSelectedItem(updatedItem);
  };

  return (
    <div>
      <Navbar />
      <div className="setup-container">
        <CustomizationToolbar
          raffleWidth={raffleWidth}
          onBackgroundColorChange={(color) => setBackgroundColor(color.hex)}
          onRaffleSizeChange={(size) => setRaffleWidth(size)}
        />
        <Canvas
          items={items}
          setItems={setItems}
          setSelectedItem={setSelectedItem}
          raffleWidth={raffleWidth}
          backgroundColor={backgroundColor}
        />
        <ConfigurationPane
          selectedItem={selectedItem}
          updateItem={updateItem}
        />
      </div>
    </div>
  );
};

export default SetUp;
