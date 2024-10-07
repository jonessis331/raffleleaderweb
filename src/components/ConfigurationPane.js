import React from "react";

const ConfigurationPane = ({ selectedItem, updateItem }) => {
  if (!selectedItem) {
    return (
      <div className="configuration-pane">Select an item to customize</div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateItem(selectedItem.id, { [name]: value });
  };

  return (
    <div className="configuration-pane">
      <h4>Customize {selectedItem.type}</h4>
      // ConfigurationPane.js
      {selectedItem.type === "text" && (
        <div>
          <label>Text Content:</label>
          <input
            type="text"
            name="content"
            value={selectedItem.content || ""}
            onChange={handleChange}
          />
          <label>Font Size:</label>
          <input
            type="number"
            name="fontSize"
            value={selectedItem.style?.fontSize || 16}
            onChange={(e) =>
              updateItem(selectedItem.id, {
                style: { ...selectedItem.style, fontSize: e.target.value },
              })
            }
          />
          <label>Color:</label>
          <input
            type="color"
            name="color"
            value={selectedItem.style?.color || "#000000"}
            onChange={(e) =>
              updateItem(selectedItem.id, {
                style: { ...selectedItem.style, color: e.target.value },
              })
            }
          />
        </div>
      )}
      {selectedItem.type === "entry" && (
        <div>
          <label>Entry Type:</label>
          <select
            name="entryType"
            value={selectedItem.entryType}
            onChange={(e) =>
              updateItem(selectedItem.id, { entryType: e.target.value })
            }
          >
            <option value="facebook">Facebook</option>
            <option value="twitter">Twitter</option>
            {/* Add more options */}
          </select>
          {/* Additional configuration fields */}
        </div>
      )}
      {selectedItem.type === "counter" && (
        <div>
          <label>End Date:</label>
          <input
            type="datetime-local"
            name="endDate"
            value={
              selectedItem.endDate
                ? new Date(selectedItem.endDate).toISOString().slice(0, -1)
                : ""
            }
            onChange={(e) =>
              updateItem(selectedItem.id, { endDate: new Date(e.target.value) })
            }
          />
        </div>
      )}
      {selectedItem.type === "image" && (
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="src"
            value={selectedItem.src || ""}
            onChange={(e) =>
              updateItem(selectedItem.id, { src: e.target.value })
            }
          />
          <label>Width:</label>
          <input
            type="number"
            name="width"
            value={selectedItem.style?.width || 100}
            onChange={(e) =>
              updateItem(selectedItem.id, {
                style: { ...selectedItem.style, width: e.target.value + "px" },
              })
            }
          />
          <label>Height:</label>
          <input
            type="number"
            name="height"
            value={selectedItem.style?.height || 100}
            onChange={(e) =>
              updateItem(selectedItem.id, {
                style: { ...selectedItem.style, height: e.target.value + "px" },
              })
            }
          />
        </div>
      )}
      {/* Similarly for other types */}
    </div>
  );
};

export default ConfigurationPane;
