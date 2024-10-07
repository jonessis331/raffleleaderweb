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
      {selectedItem.type === "text" && (
        <div>
          <label>Text Content:</label>
          <input
            type="text"
            name="content"
            value={selectedItem.content || ""}
            onChange={handleChange}
          />
        </div>
      )}
      {/* Similarly for other types */}
    </div>
  );
};

export default ConfigurationPane;
