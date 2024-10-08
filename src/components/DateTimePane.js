// src/components/DateTimePane.js
import React from "react";
import "../styles/Modals.css";

const DateTimePane = ({
  onClose,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  timeZone,
  setTimeZone,
}) => {
  const timeZones = [
    "UTC",
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo",
    // Add more time zones as needed
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content date-time-pane">
        <h3>Date and Time Settings</h3>
        <label>Start Date and Time:</label>
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>End Date and Time:</label>
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <label>Time Zone:</label>
        <select value={timeZone} onChange={(e) => setTimeZone(e.target.value)}>
          {timeZones.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default DateTimePane;
