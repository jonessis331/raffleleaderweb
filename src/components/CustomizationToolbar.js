import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "../styles/CustomizationToolbar.css";
import { SketchPicker } from "react-color";
const draggableItems = [
  { id: "text", label: "Text", icon: "images/text.png" },
  { id: "entry", label: "Entry", icon: "images/entry.png" },
  { id: "counter", label: "Counter", icon: "images/counter.png" },
  { id: "image", label: "Image", icon: "images/image.png" },
];

const CustomizationToolbar = ({
  onBackgroundColorChange,
  raffleWidth,
  onFooterTextColorChange,
  onFooterBackgroundColorChange,
  onRaffleSizeChange,
}) => {
  //const [raffleWidth, setRaffleWidth] = useState(500);

  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    //setRaffleWidth(newSize);
    console.log(newSize);
    onRaffleSizeChange(newSize);
  };

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
