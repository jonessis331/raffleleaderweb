// src/components/ConfigurationPane.js
import React from "react";

const ConfigurationPane = ({ selectedItem, updateItem }) => {
  if (!selectedItem) {
    return (
      <div className="configuration-pane">Select an item to customize</div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateItem({
      ...selectedItem,
      props: {
        ...selectedItem.props,
        [name]: value,
      },
    });
  };

  return (
    <div className="configuration-pane">
      <h4>Customize {selectedItem.type}</h4>
      {selectedItem.type === "text" && (
        <div>
          <label>Text Content:</label>
          <input
            type="text"
            name="content"
            value={selectedItem.props.content || ""}
            onChange={handleChange}
          />
          <label>Font Size:</label>
          <input
            type="number"
            name="fontSize"
            value={selectedItem.props.fontSize || 16}
            onChange={handleChange}
          />
          <label>Color:</label>
          <input
            type="color"
            name="color"
            value={selectedItem.props.color || "#000000"}
            onChange={handleChange}
          />
        </div>
      )}
      {selectedItem.type === "entry" && (
        <div>
          <label>Entry Type:</label>
          <select
            name="entryType"
            value={selectedItem.props.entryType}
            onChange={handleChange}
          >
            <option value="facebook">Facebook</option>
            <option value="twitter">Twitter</option>
            {/* Add more options */}
          </select>
        </div>
      )}
      {selectedItem.type === "counter" && (
        <div>
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
        </div>
      )}
      {selectedItem.type === "image" && (
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="src"
            value={selectedItem.props.src || ""}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default ConfigurationPane;
