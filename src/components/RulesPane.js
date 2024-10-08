// src/components/RulesPane.js
import React from "react";
import "../styles/Modals.css";

const RulesPane = ({ onClose, rulesText, setRulesText }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content rules-pane">
        <h3>Terms and Rules</h3>
        <textarea
          rows={10}
          value={rulesText}
          onChange={(e) => setRulesText(e.target.value)}
        ></textarea>
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default RulesPane;
