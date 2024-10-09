// src/pages/SetUp.js
import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import CustomizationToolbar from "../components/CustomizationToolbar";
import Canvas from "../components/Canvas";
import ConfigurationPane from "../components/ConfigurationPane";
import LayersPane from "../components/LayersPane";
import "../styles/SetUp.css";

const SetUp = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [raffleWidth, setRaffleWidth] = useState(500);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [rulesText, setRulesText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timeZone, setTimeZone] = useState("UTC");

  // Undo/Redo history stacks
  const undoStack = useRef([]);
  const redoStack = useRef([]);

  const updateItems = (newItems) => {
    undoStack.current.push(items);
    setItems(newItems);
    redoStack.current = []; // Clear redo stack
  };

  const undo = () => {
    if (undoStack.current.length > 0) {
      const previousItems = undoStack.current.pop();
      redoStack.current.push(items);
      setItems(previousItems);
      setSelectedItem(null);
    }
  };

  const redo = () => {
    if (redoStack.current.length > 0) {
      const nextItems = redoStack.current.pop();
      undoStack.current.push(items);
      setItems(nextItems);
      setSelectedItem(null);
    }
  };

  const updateItem = (updatedItem) => {
    updateItems(
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setSelectedItem(updatedItem);
  };

  const deleteItem = (id) => {
    updateItems(items.filter((item) => item.id !== id));
    setSelectedItem(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" && selectedItem) {
        // Show confirmation modal if needed
        deleteItem(selectedItem.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

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
    <div className="setup-page">
      <Navbar />
      <CustomizationToolbar
        raffleWidth={raffleWidth}
        onBackgroundColorChange={(color) => setBackgroundColor(color.hex)}
        onRaffleSizeChange={(size) => setRaffleWidth(size)}
        undo={undo}
        redo={redo}
        rulesText={rulesText}
        setRulesText={setRulesText}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        timeZone={timeZone}
        setTimeZone={setTimeZone}
      />
      <div className="setup-container">
        <LayersPane
          items={items}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
        />
        <div className="canvas-container">
          <Canvas
            items={items}
            setItems={setItems}
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
            raffleWidth={raffleWidth}
            backgroundColor={backgroundColor}
            deleteItem={deleteItem}
          />
        </div>
        <ConfigurationPane
          selectedItem={selectedItem}
          updateItem={updateItem}
          bringForward={bringForward}
          sendBackward={sendBackward}
          deleteItem={deleteItem}
        />
      </div>
    </div>
  );
};

export default SetUp;
