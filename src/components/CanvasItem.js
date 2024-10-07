// src/components/CanvasItem.js
import React from "react";
import { Rnd } from "react-rnd";
import CounterDraggable from "./CounterDraggable";

const CanvasItem = ({ item, setItems, setSelectedItem }) => {
  const { id, type, x, y, width, height, props } = item;

  const onDragStop = (e, d) => {
    setItems((prevItems) =>
      prevItems.map((it) => (it.id === id ? { ...it, x: d.x, y: d.y } : it))
    );
  };

  const onResizeStop = (e, direction, ref, delta, position) => {
    setItems((prevItems) =>
      prevItems.map((it) =>
        it.id === id
          ? {
              ...it,
              width: ref.offsetWidth,
              height: ref.offsetHeight,
              x: position.x,
              y: position.y,
            }
          : it
      )
    );
  };

  return (
    <Rnd
      size={{ width, height }}
      position={{ x, y }}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
      bounds="parent"
      onClick={() => setSelectedItem(item)}
      style={{
        border: item.isSelected ? "2px solid blue" : "none",
      }}
    >
      {renderComponent(item)}
    </Rnd>
  );
};

const renderComponent = (item) => {
  const { type, props } = item;
  switch (type) {
    case "text":
      return (
        <div
          style={{
            fontSize: `${props.fontSize}px`,
            color: props.color,
            width: "100%",
            height: "100%",
          }}
        >
          {props.content}
        </div>
      );
    case "entry":
      return (
        <div style={{ width: "100%", height: "100%" }}>
          {props.entryType} Entry
        </div>
      );
    case "counter":
      return <CounterDraggable endDate={props.endDate} />;
    case "image":
      return (
        <img
          src={props.src}
          alt="User Uploaded"
          style={{ width: "100%", height: "100%" }}
        />
      );
    default:
      return null;
  }
};

export default CanvasItem;
