import React from "react";
import "../styles/RafflePreview.css";
import { Droppable, Draggable } from "react-beautiful-dnd";

const RafflePreview = ({ raffleItems }) => {
  return (
    <div
      className="raffle-preview"
      style={{ width: "500px", margin: "0 auto" }}
    >
      <h4>Raffle Preview</h4>
      <Droppable droppableId="rafflePreview">
        {(provided) => (
          <div
            className="preview-content"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {raffleItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    className="raffle-item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.type === "text" && (
                      <div>Text Component Placeholder</div>
                    )}
                    {item.type === "entry" && (
                      <div>Entry Component Placeholder</div>
                    )}
                    {item.type === "counter" && (
                      <div>Counter Component Placeholder</div>
                    )}
                    {item.type === "image" && (
                      <div>Image Component Placeholder</div>
                    )}
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

export default RafflePreview;
