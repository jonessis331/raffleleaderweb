import React, { useState } from "react";
import Navbar from "../components/Navbar";
import RafflePreview from "../components/RafflePreview";
import CustomizationToolbar from "../components/CustomizationToolbar";
import { DragDropContext } from "react-beautiful-dnd";
import "../styles/SetUp.css";
import ConfigurationPane from "../components/ConfigurationPane";
import RulesPane from "../components/RulesPane";

const SetUp = () => {
  const [raffleItems, setRaffleItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000));

  const [raffleWidth, setRaffleWidth] = useState(500);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const updateItem = (id, changes) => {
    setRaffleItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              ...changes,
              style: { ...item.style, ...changes.style },
            }
          : item
      )
    );
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem((prevItem) => ({
        ...prevItem,
        ...changes,
        style: { ...prevItem.style, ...changes.style },
      }));
    }
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
      let newItem = {
        id: `${draggableId}-${Date.now()}`, // Unique ID
        type: draggableId,
      };

      switch (draggableId) {
        case "text":
          newItem = {
            ...newItem,
            content: "Sample Text",
            style: { fontSize: "16px", color: "#000000" },
          };
          break;
        case "entry":
          newItem = {
            ...newItem,
            entryType: "facebook", // Default entry type
            props: {},
          };
          break;
        case "counter":
          newItem = {
            ...newItem,
            endDate: new Date(Date.now() + 86400000), // 24 hours from now
          };
          break;
        case "image":
          newItem = {
            ...newItem,
            src: "https://via.placeholder.com/150",
            style: { width: "150px", height: "150px" },
          };
          break;
        default:
          break;
      }

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
            raffleWidth={raffleWidth}
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

          <RulesPane
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </DragDropContext>
      </div>
    </div>
  );
};

export default SetUp;
