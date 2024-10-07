// src/components/ToolbarItem.js
import React from "react";
import { useDrag } from "react-dnd";

const ToolbarItem = ({ type, label, icon }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="draggable-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img src={icon} alt={label} />
      <span>{label}</span>
    </div>
  );
};

export default ToolbarItem;
