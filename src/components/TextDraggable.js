import React from "react";

const TextDraggable = ({ content, style }) => {
  return <div style={style}>{content || "Sample Text"}</div>;
};

export default TextDraggable;
