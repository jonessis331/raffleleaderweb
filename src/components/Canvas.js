// src/components/Canvas.js
import React from "react";
import { useDrop } from "react-dnd";
import CanvasItem from "./CanvasItem";
import "../styles/Canvas.css";

const Canvas = ({
  items,
  setItems,
  setSelectedItem,
  raffleWidth,
  backgroundColor,
}) => {
  const [, drop] = useDrop(() => ({
    accept: "item",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const canvas = document.getElementById("canvas");
      const canvasRect = canvas.getBoundingClientRect();

      const x = offset.x - canvasRect.left;
      const y = offset.y - canvasRect.top;

      const newItem = {
        id: `${item.type}-${Date.now()}`,
        type: item.type,
        x,
        y,
        width: 100,
        height: 100,
        props: getDefaultProps(item.type),
      };

      setItems((prevItems) => [...prevItems, newItem]);
    },
  }));

  return (
    <div
      id="canvas"
      ref={drop}
      className="canvas"
      style={{
        width: `${raffleWidth}px`,
        height: "600px",
        backgroundColor,
      }}
    >
      {items.map((item) => (
        <CanvasItem
          key={item.id}
          item={item}
          setItems={setItems}
          setSelectedItem={setSelectedItem}
        />
      ))}
    </div>
  );
};

const getDefaultProps = (type) => {
  switch (type) {
    case "text":
      return { content: "Sample Text", fontSize: "16", color: "#000000" };
    case "entry":
      return { entryType: "facebook" };
    case "counter":
      return { endDate: new Date(Date.now() + 86400000).getTime() };
    case "image":
      return { src: "https://via.placeholder.com/150" };
    default:
      return {};
  }
};

export default Canvas;
