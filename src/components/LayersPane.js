// src/components/LayersPane.js
import React from "react";
import "../styles/LayersPane.css";

const LayersPane = ({ items, setSelectedItem, selectedItem }) => {
  return (
    <div className="layers-pane">
      <h4>Layers</h4>
      <ul>
        {items
          .slice()
          .reverse()
          .map((item, index) => (
            <li
              key={item.id}
              className={selectedItem?.id === item.id ? "active" : ""}
              onClick={() => setSelectedItem(item)}
            >
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LayersPane;
