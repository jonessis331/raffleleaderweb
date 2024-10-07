// RafflePreview.js
import React from "react";
import "../styles/RafflePreview.css";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TextDraggable from "./TextDraggable";
import EntryDraggable from "./EntryDraggable";
import CounterDraggable from "./CounterDraggable";
import ImageDraggable from "./ImageDraggable";

const RafflePreview = ({
  raffleItems,
  setSelectedItem,
  raffleWidth,
  backgroundColor,
}) => {
  return (
    <div
      className="raffle-preview"
      style={{ width: `${raffleWidth}px`, backgroundColor }}
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
                    onClick={() => setSelectedItem(item)}
                  >
                    {item.type === "text" && (
                      <TextDraggable
                        content={item.content}
                        style={item.style}
                      />
                    )}
                    {item.type === "entry" && (
                      <EntryDraggable
                        entryType={item.entryType}
                        props={item.props}
                      />
                    )}
                    {item.type === "counter" && (
                      <CounterDraggable endDate={item.endDate} />
                    )}
                    {item.type === "image" && (
                      <ImageDraggable src={item.src} style={item.style} />
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
