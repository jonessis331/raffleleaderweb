// src/components/ConfigurationPane.js
import React from "react";
import "../styles/ConfigurationPane.css";

const fonts = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier New",
  "Verdana",
  "Georgia",
  "Palatino",
  "Garamond",
  "Comic Sans MS",
  "Trebuchet MS",
  "Arial Black",
  "Impact",
];

const ConfigurationPane = ({
  selectedItem,
  updateItem,
  bringForward,
  sendBackward,
}) => {
  if (!selectedItem) {
    return (
      <div className="configuration-pane">Select an item to customize</div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;
    if (type === "checkbox") {
      newValue = checked;
    }
    updateItem({
      ...selectedItem,
      props: {
        ...selectedItem.props,
        [name]: newValue,
      },
    });
  };

  return (
    <div className="configuration-pane">
      <h4>Customize {selectedItem.type}</h4>
      {selectedItem.type === "text" && (
        <div className="text-configuration">
          {/* Edit Text */}
          <label>Edit Text:</label>
          <textarea
            name="content"
            value={selectedItem.props.content || ""}
            onChange={handleChange}
            rows={4}
          />

          <div className="font-style-buttons">
            <button
              className={
                selectedItem.props.fontWeight === "bold" ? "active" : ""
              }
              onClick={() =>
                handleChange({
                  target: {
                    name: "fontWeight",
                    value:
                      selectedItem.props.fontWeight === "bold"
                        ? "normal"
                        : "bold",
                  },
                })
              }
            >
              <b>B</b>
            </button>
            <button
              className={
                selectedItem.props.fontStyle === "italic" ? "active" : ""
              }
              onClick={() =>
                handleChange({
                  target: {
                    name: "fontStyle",
                    value:
                      selectedItem.props.fontStyle === "italic"
                        ? "normal"
                        : "italic",
                  },
                })
              }
            >
              <i>I</i>
            </button>
            <button
              className={
                selectedItem.props.textDecoration?.includes("underline")
                  ? "active"
                  : ""
              }
              onClick={() => {
                const hasUnderline =
                  selectedItem.props.textDecoration?.includes("underline");
                const newDecoration = hasUnderline
                  ? selectedItem.props.textDecoration
                      .replace("underline", "")
                      .trim()
                  : (selectedItem.props.textDecoration || "") + " underline";
                handleChange({
                  target: {
                    name: "textDecoration",
                    value: newDecoration,
                  },
                });
              }}
            >
              <u>U</u>
            </button>
            <button
              className={
                selectedItem.props.textDecoration?.includes("line-through")
                  ? "active"
                  : ""
              }
              onClick={() => {
                const hasLineThrough =
                  selectedItem.props.textDecoration?.includes("line-through");
                const newDecoration = hasLineThrough
                  ? selectedItem.props.textDecoration
                      .replace("line-through", "")
                      .trim()
                  : (selectedItem.props.textDecoration || "") + " line-through";
                handleChange({
                  target: {
                    name: "textDecoration",
                    value: newDecoration,
                  },
                });
              }}
            >
              <s>S</s>
            </button>
            <button
              className={
                selectedItem.props.textDecoration?.includes("overline")
                  ? "active"
                  : ""
              }
              onClick={() => {
                const hasOverline =
                  selectedItem.props.textDecoration?.includes("overline");
                const newDecoration = hasOverline
                  ? selectedItem.props.textDecoration
                      .replace("overline", "")
                      .trim()
                  : (selectedItem.props.textDecoration || "") + " overline";
                handleChange({
                  target: {
                    name: "textDecoration",
                    value: newDecoration,
                  },
                });
              }}
            >
              <span style={{ textDecoration: "overline" }}>O</span>
            </button>
          </div>

          {/* Text Font */}
          <label>Font Family:</label>
          <select
            name="fontFamily"
            value={selectedItem.props.fontFamily || "Arial"}
            onChange={handleChange}
          >
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>

          {/* Font Color */}
          <label>Font Color:</label>
          <input
            type="color"
            name="color"
            value={selectedItem.props.color || "#000000"}
            onChange={handleChange}
          />

          {/* Font Size */}
          <label>Font Size (px):</label>
          <input
            type="number"
            name="fontSize"
            value={selectedItem.props.fontSize || 16}
            onChange={handleChange}
            min={1}
          />

          {/* Letter Spacing */}
          <label>Letter Spacing (px):</label>
          <input
            type="number"
            name="letterSpacing"
            value={selectedItem.props.letterSpacing || 0}
            onChange={handleChange}
          />

          {/* Line Height */}
          <label>Line Height (px):</label>
          <input
            type="number"
            name="lineHeight"
            value={selectedItem.props.lineHeight || 20}
            onChange={handleChange}
            min={1}
          />

          {/* Horizontal Text Alignment */}
          <label>Horizontal Alignment:</label>
          <div className="alignment-buttons">
            <button
              className={
                selectedItem.props.textAlign === "left" ? "active" : ""
              }
              onClick={() =>
                handleChange({
                  target: { name: "textAlign", value: "left" },
                })
              }
            >
              <img src="icons/align-left.png" alt="Left Align" />
            </button>
            <button
              className={
                selectedItem.props.textAlign === "center" ? "active" : ""
              }
              onClick={() =>
                handleChange({
                  target: { name: "textAlign", value: "center" },
                })
              }
            >
              <img src="icons/align-center.png" alt="Center Align" />
            </button>
            <button
              className={
                selectedItem.props.textAlign === "right" ? "active" : ""
              }
              onClick={() =>
                handleChange({
                  target: { name: "textAlign", value: "right" },
                })
              }
            >
              <img src="icons/align-right.png" alt="Right Align" />
            </button>
          </div>

          {/* Vertical Text Alignment */}
          <label>Vertical Alignment:</label>
          <div className="alignment-buttons">
            <button
              className={
                selectedItem.props.verticalAlign === "top" ? "active" : ""
              }
              onClick={() =>
                handleChange({
                  target: { name: "verticalAlign", value: "top" },
                })
              }
            >
              <img src="icons/align-top.png" alt="Top Align" />
            </button>
            <button
              className={
                selectedItem.props.verticalAlign === "middle" ? "active" : ""
              }
              onClick={() =>
                handleChange({
                  target: { name: "verticalAlign", value: "middle" },
                })
              }
            >
              <img src="icons/align-middle.png" alt="Middle Align" />
            </button>
            <button
              className={
                selectedItem.props.verticalAlign === "bottom" ? "active" : ""
              }
              onClick={() =>
                handleChange({
                  target: { name: "verticalAlign", value: "bottom" },
                })
              }
            >
              <img src="icons/align-bottom.png" alt="Bottom Align" />
            </button>
          </div>

          {/* Text Orientation */}
          <label>Text Orientation:</label>
          <div className="orientation-buttons">
            <button
              className={
                selectedItem.props.textOrientation === "horizontal"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleChange({
                  target: { name: "textOrientation", value: "horizontal" },
                })
              }
            >
              Horizontal
            </button>
            <button
              className={
                selectedItem.props.textOrientation === "vertical"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleChange({
                  target: { name: "textOrientation", value: "vertical" },
                })
              }
            >
              Vertical
            </button>
          </div>
          {/* Layer Management */}
          <div className="layer-management">
            <button onClick={() => bringForward(selectedItem.id)}>
              Bring Forward
            </button>
            <button onClick={() => sendBackward(selectedItem.id)}>
              Send Backward
            </button>
          </div>
        </div>
      )}
      {/* Configuration options for other item types... */}
    </div>
  );
};

export default ConfigurationPane;
