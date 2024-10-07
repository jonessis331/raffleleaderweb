// src/components/CustomizationToolbar.js
import React from "react";
import "../styles/CustomizationToolbar.css";
import { SketchPicker } from "react-color";

const CustomizationToolbar = ({ onColorChange }) => {
  return (
    <div className="customization-toolbar">
      <h4>Customization Toolbar</h4>
      <div className="toolbar-options">
        {/* Toolbar options like Add Text, Add Entry, etc. */}
        <SketchPicker onChange={onColorChange} />
      </div>
    </div>
  );
};

export default CustomizationToolbar;
