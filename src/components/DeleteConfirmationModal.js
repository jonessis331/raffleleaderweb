// src/components/DeleteConfirmationModal.js
import React from "react";
import "../styles/Modals.css";

const DeleteConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this item?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Yes, Delete</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
