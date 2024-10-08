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

  // Bring Forward and Send Backward functions remain the same
  const bringForward = (id) => {
    setItems((prevItems) => {
      const index = prevItems.findIndex((item) => item.id === id);
      if (index < prevItems.length - 1) {
        const newItems = [...prevItems];
        [newItems[index], newItems[index + 1]] = [
          newItems[index + 1],
          newItems[index],
        ];
        return newItems;
      }
      return prevItems;
    });
  };

  const sendBackward = (id) => {
    setItems((prevItems) => {
      const index = prevItems.findIndex((item) => item.id === id);
      if (index > 0) {
        const newItems = [...prevItems];
        [newItems[index], newItems[index - 1]] = [
          newItems[index - 1],
          newItems[index],
        ];
        return newItems;
      }
      return prevItems;
    });
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
          selectedItem={selectedItem}
          raffleWidth={raffleWidth}
          backgroundColor={backgroundColor}
        />
        <ConfigurationPane
          selectedItem={selectedItem}
          updateItem={updateItem}
          bringForward={bringForward}
          sendBackward={sendBackward}
        />
      </div>
    </div>
  );
};

export default SetUp;
