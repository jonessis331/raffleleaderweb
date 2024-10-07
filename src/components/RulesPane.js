import React from "react";

const RulesPane = ({ startDate, endDate, setStartDate, setEndDate }) => {
  return (
    <div className="rules-pane">
      <h4>Rules Configuration</h4>
      <label>Start Date:</label>
      <input
        type="datetime-local"
        value={startDate ? new Date(startDate).toISOString().slice(0, -1) : ""}
        onChange={(e) => setStartDate(new Date(e.target.value))}
      />
      <label>End Date:</label>
      <input
        type="datetime-local"
        value={endDate ? new Date(endDate).toISOString().slice(0, -1) : ""}
        onChange={(e) => setEndDate(new Date(e.target.value))}
      />
    </div>
  );
};

export default RulesPane;
