// src/components/CanvasItem.js
import React from "react";
import { Rnd } from "react-rnd";
import CounterDraggable from "./CounterDraggable";

const CanvasItem = ({
  item,
  setItems,
  setSelectedItem,
  isSelected,
  setIsItemDragging,
}) => {
  const { id, type, x, y, width, height, props } = item;

  const onDragStart = () => {
    setIsItemDragging(true);
  };

  const onDragStop = (e, d) => {
    setIsItemDragging(false);
    setItems((prevItems) =>
      prevItems.map((it) => (it.id === id ? { ...it, x: d.x, y: d.y } : it))
    );
  };

  const onResizeStart = () => {
    setIsItemDragging(true);
  };

  const onResizeStop = (e, direction, ref, delta, position) => {
    setIsItemDragging(false);
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
      onDragStart={onDragStart}
      onDragStop={onDragStop}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      bounds="parent"
      onClick={() => setSelectedItem(item)}
      style={{
        zIndex: item.zIndex || 0,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          boxSizing: "border-box",
          border: isSelected ? "2px dashed blue" : "none",
          borderRadius: `${props.borderRadius || 0}px`,
          overflow: "hidden",
          pointerEvents: "auto",
        }}
      >
        {renderComponent(item)}
      </div>
    </Rnd>
  );
};

const renderComponent = (item) => {
  const { type, props } = item;

  switch (type) {
    case "text":
      const isVertical = props.textOrientation === "vertical";

      const textContent = isVertical
        ? props.content.split("").map((char, index) => (
            <span key={index} style={{ display: "block" }}>
              {char}
            </span>
          ))
        : props.content;

      const textAlignMap = {
        left: "flex-start",
        center: "center",
        right: "flex-end",
      };

      const verticalAlignMap = {
        top: "flex-start",
        middle: "center",
        bottom: "flex-end",
      };

      const style = {
        fontSize: `${props.fontSize}px`,
        color: props.color,
        fontWeight: props.fontWeight,
        fontStyle: props.fontStyle,
        textDecoration: props.textDecoration,
        fontFamily: props.fontFamily,
        letterSpacing: `${props.letterSpacing}px`,
        lineHeight: `${props.lineHeight}px`,
        textAlign: props.textAlign,
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        alignItems: isVertical
          ? textAlignMap[props.textAlign] || "flex-start"
          : verticalAlignMap[props.verticalAlign] || "flex-start",
        justifyContent: isVertical
          ? verticalAlignMap[props.verticalAlign] || "flex-start"
          : textAlignMap[props.textAlign] || "flex-start",
        width: "100%",
        height: "100%",
        wordBreak: "break-word",
        overflowWrap: "break-word",
        whiteSpace: "pre-wrap",
      };

      return <div style={style}>{textContent}</div>;

    case "entry":
      return (
        <div style={{ width: "100%", height: "100%" }}>
          {props.entryType} Entry
        </div>
      );
    case "counter":
      return <CounterDraggable endDate={props.endDate} props={props} />;
    case "image":
      return (
        <img
          src={props.src}
          alt="User Uploaded"
          style={{
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            borderStyle: "solid",
            borderColor: props.borderColor || "#000",
            borderTopWidth: `${props.borderTopWidth || 0}px`,
            borderRightWidth: `${props.borderRightWidth || 0}px`,
            borderBottomWidth: `${props.borderBottomWidth || 0}px`,
            borderLeftWidth: `${props.borderLeftWidth || 0}px`,
            borderTopLeftRadius: `${props.borderTopLeftRadius || 0}px`,
            borderTopRightRadius: `${props.borderTopRightRadius || 0}px`,
            borderBottomRightRadius: `${props.borderBottomRightRadius || 0}px`,
            borderBottomLeftRadius: `${props.borderBottomLeftRadius || 0}px`,
            objectFit: "cover",
          }}
        />
      );
    default:
      return null;
  }
};

export default CanvasItem;
