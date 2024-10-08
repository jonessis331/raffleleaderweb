// src/components/ConfigurationPane.js
import React, { useState } from "react";
import "../styles/ConfigurationPane.css";
import ImageUploadModal from "./ImageUploadModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

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
  deleteItem,
}) => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
      {selectedItem.type === "image" && (
        <div className="image-configuration">
          {/* Insert Image Button */}
          <button onClick={() => setShowImageUpload(true)}>Insert Image</button>

          {/* Image Upload Modal */}
          {showImageUpload && (
            <ImageUploadModal
              onClose={() => setShowImageUpload(false)}
              onImageSelect={(src) => {
                handleChange({ target: { name: "src", value: src } });
                setShowImageUpload(false);
              }}
            />
          )}

          {/* Border Color */}
          <label>Border Color:</label>
          <input
            type="color"
            name="borderColor"
            value={selectedItem.props.borderColor || "#000000"}
            onChange={handleChange}
          />

          {/* Border Width */}
          <label>Border Width (px):</label>
          <div className="border-width-inputs">
            <label>
              Top:
              <input
                type="number"
                name="borderTopWidth"
                value={selectedItem.props.borderTopWidth || 0}
                onChange={handleChange}
                min={0}
              />
            </label>
            <label>
              Right:
              <input
                type="number"
                name="borderRightWidth"
                value={selectedItem.props.borderRightWidth || 0}
                onChange={handleChange}
                min={0}
              />
            </label>
            <label>
              Bottom:
              <input
                type="number"
                name="borderBottomWidth"
                value={selectedItem.props.borderBottomWidth || 0}
                onChange={handleChange}
                min={0}
              />
            </label>
            <label>
              Left:
              <input
                type="number"
                name="borderLeftWidth"
                value={selectedItem.props.borderLeftWidth || 0}
                onChange={handleChange}
                min={0}
              />
            </label>
          </div>

          {/* Border Radius */}
          <label>Border Radius (px):</label>
          <div className="border-radius-inputs">
            <label>
              Top Left:
              <input
                type="number"
                name="borderTopLeftRadius"
                value={selectedItem.props.borderTopLeftRadius || 0}
                onChange={handleChange}
                min={0}
              />
            </label>
            <label>
              Top Right:
              <input
                type="number"
                name="borderTopRightRadius"
                value={selectedItem.props.borderTopRightRadius || 0}
                onChange={handleChange}
                min={0}
              />
            </label>
            <label>
              Bottom Right:
              <input
                type="number"
                name="borderBottomRightRadius"
                value={selectedItem.props.borderBottomRightRadius || 0}
                onChange={handleChange}
                min={0}
              />
            </label>
            <label>
              Bottom Left:
              <input
                type="number"
                name="borderBottomLeftRadius"
                value={selectedItem.props.borderBottomLeftRadius || 0}
                onChange={handleChange}
                min={0}
              />
            </label>
          </div>
        </div>
      )}

      {/* Layer Management */}
      <div className="layer-management">
        <button onClick={() => bringForward(selectedItem.id)}>
          Bring Forward
        </button>
        <button onClick={() => sendBackward(selectedItem.id)}>
          Send Backward
        </button>
      </div>

      {/* Delete Item */}
      <button
        className="delete-button"
        onClick={() => setShowDeleteConfirm(true)}
      >
        Delete Item
      </button>

      {showDeleteConfirm && (
        <DeleteConfirmationModal
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={() => {
            deleteItem(selectedItem.id);
            setShowDeleteConfirm(false);
          }}
        />
      )}
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
              <img src="/assets/images/left-text-align.png" alt="Left Align" />
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
              <img
                src="/assets/images/center-text-align.png"
                alt="Center Align"
              />
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
              <img
                src="/assets/images/right-text-align.png"
                alt="Right Align"
              />
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

      {selectedItem.type === "counter" && (
        <div className="counter-configuration">
          {/* End Date */}
          <label>End Date:</label>
          <input
            type="datetime-local"
            name="endDate"
            value={
              selectedItem.props.endDate
                ? new Date(parseInt(selectedItem.props.endDate))
                    .toISOString()
                    .slice(0, -1)
                : ""
            }
            onChange={(e) =>
              handleChange({
                target: {
                  name: "endDate",
                  value: new Date(e.target.value).getTime(),
                },
              })
            }
          />

          {/* Styling Options */}
          {/* Include fontSize, color, fontWeight, etc., similar to the Text component */}
          {/* Example: */}
          <label>Font Size (px):</label>
          <input
            type="number"
            name="fontSize"
            value={selectedItem.props.fontSize || 16}
            onChange={handleChange}
            min={1}
          />
          {/* Add other styling options as needed */}
        </div>
      )}
    </div>
  );
};

export default ConfigurationPane;
