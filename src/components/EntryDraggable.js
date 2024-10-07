// EntryComponent.js
import React from "react";

const EntryDraggable = ({ entryType, props }) => {
  // Replace with your actual components
  const EntryDraggables = {
    facebook: <div>Facebook Entry</div>,
    twitter: <div>Twitter Entry</div>,
    // Add other types
  };

  return EntryDraggables[entryType] || <div>Unknown Entry Type</div>;
};

export default EntryDraggable;
