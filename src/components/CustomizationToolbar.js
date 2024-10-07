// src/components/CustomizationToolbar.js
import React from "react";
import ToolbarItem from "./ToolbarItem";
import "../styles/CustomizationToolbar.css";
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
}) => {
  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    onRaffleSizeChange(newSize);
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
        <SketchPicker onChangeComplete={onBackgroundColorChange} />
      </div>
    </div>
  );
};

export default CustomizationToolbar;
