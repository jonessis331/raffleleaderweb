// src/components/CustomizationToolbar.js
import React, { useState } from "react";
import ToolbarItem from "./ToolbarItem";
import "../styles/CustomizationToolbar.css";
import RulesPane from "./RulesPane";
import DateTimePane from "./DateTimePane";
import { SketchPicker } from "react-color";

const draggableItems = [
  { type: "text", label: "Text", icon: "images/text.png" },
  { type: "entry", label: "Entry", icon: "images/entry.png" },
  { type: "counter", label: "Counter", icon: "images/counter.png" },
  { type: "image", label: "Image", icon: "images/image.png" },
];

const CustomizationToolbar = ({
  onBackgroundColorChange,
  raffleWidth,
  onRaffleSizeChange,
  undo,
  redo,
  rulesText,
  setRulesText,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  timeZone,
  setTimeZone,
}) => {
  const [showRulesPane, setShowRulesPane] = useState(false);
  const [showDateTimePane, setShowDateTimePane] = useState(false);

  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    onRaffleSizeChange(newSize);
  };
  const handleColorChange = (e) => {
    onBackgroundColorChange({ hex: e.target.value });
  };

  return (
    <div className="customization-toolbar">
      <h4>Customization Toolbar</h4>
      <div className="draggable-section">
        {draggableItems.map((item) => (
          <ToolbarItem key={item.type} {...item} />
        ))}
      </div>

      <div>
        <label>Raffle Width:</label>
        <input
          type="number"
          value={raffleWidth}
          onChange={handleSizeChange}
          min="300"
          max="800"
        />
      </div>
      <div>
        <label>Background Color:</label>
        <input type="color" onChange={handleColorChange} />
      </div>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
      <button onClick={() => setShowRulesPane(true)}>Rules</button>
      <button onClick={() => setShowDateTimePane(true)}>Date/Time</button>
      {showRulesPane && (
        <RulesPane
          onClose={() => setShowRulesPane(false)}
          rulesText={rulesText}
          setRulesText={setRulesText}
        />
      )}
      {showDateTimePane && (
        <DateTimePane
          onClose={() => setShowDateTimePane(false)}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          timeZone={timeZone}
          setTimeZone={setTimeZone}
        />
      )}
    </div>
  );
};

export default CustomizationToolbar;
