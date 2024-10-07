import React, { useState } from "react";
import Navbar from "../components/Navbar";
import RafflePreview from "../components/RafflePreview";
import CustomizationToolbar from "../components/CustomizationToolbar";
import { DragDropContext } from "react-beautiful-dnd";
import "../styles/SetUp.css";
import ConfigurationPane from "../components/ConfigurationPane";

const SetUp = () => {
  const [raffleItems, setRaffleItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [raffleWidth, setRaffleWidth] = useState(500);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const updateItem = (id, changes) => {
    setRaffleItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, ...changes } : item))
    );
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    // Dropping in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Handle dropping from the toolbar to the raffle preview
    if (
      source.droppableId === "toolbar" &&
      destination.droppableId === "rafflePreview"
    ) {
      const newItem = {
        id: `${draggableId}-${Date.now()}`, // Unique ID
        type: draggableId,
      };
      const newRaffleItems = Array.from(raffleItems);
      newRaffleItems.splice(destination.index, 0, newItem);
      setRaffleItems(newRaffleItems);
    }
    // Handle rearranging items within the raffle preview
    else if (
      source.droppableId === "rafflePreview" &&
      destination.droppableId === "rafflePreview"
    ) {
      const newRaffleItems = Array.from(raffleItems);
      const [movedItem] = newRaffleItems.splice(source.index, 1);
      newRaffleItems.splice(destination.index, 0, movedItem);
      setRaffleItems(newRaffleItems);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="setup-container">
        <DragDropContext onDragEnd={onDragEnd}>
          <CustomizationToolbar
            onBackgroundColorChange={(color) => setBackgroundColor(color.hex)}
            onRaffleSizeChange={(size) => setRaffleWidth(size)}
            // ... other handlers
          />
          <RafflePreview
            raffleItems={raffleItems}
            setSelectedItem={setSelectedItem}
            raffleWidth={raffleWidth}
            backgroundColor={backgroundColor}
            // ... other props
          />
          <ConfigurationPane
            selectedItem={selectedItem}
            updateItem={updateItem}
          />
        </DragDropContext>
      </div>
    </div>
  );
};

export default SetUp;
