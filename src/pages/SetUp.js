import React, { useState } from "react";
import Navbar from "../components/Navbar";
import RafflePreview from "../components/RafflePreview";
import CustomizationToolbar from "../components/CustomizationToolbar";
import { DragDropContext } from "react-beautiful-dnd";
import "../styles/SetUp.css";

const SetUp = () => {
  const [raffleItems, setRaffleItems] = useState([]);

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
          <CustomizationToolbar />
          <RafflePreview raffleItems={raffleItems} />
        </DragDropContext>
      </div>
    </div>
  );
};

export default SetUp;
