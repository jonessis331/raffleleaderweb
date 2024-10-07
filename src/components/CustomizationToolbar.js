import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "../styles/CustomizationToolbar.css";

const draggableItems = [
  { id: "text", label: "Text", icon: "/text.png" },
  { id: "entry", label: "Entry", icon: "/entry.png" },
  { id: "counter", label: "Counter", icon: "/counter.png" },
  { id: "image", label: "Image", icon: "/image.png" },
];

const CustomizationToolbar = () => {
  return (
    <div className="customization-toolbar">
      <h4>Customization Toolbar</h4>
      <Droppable droppableId="toolbar" isDropDisabled={true}>
        {(provided) => (
          <div
            className="draggable-section"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {draggableItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    className="draggable-item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <img src={item.icon} alt={item.label} />
                    <span>{item.label}</span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default CustomizationToolbar;
