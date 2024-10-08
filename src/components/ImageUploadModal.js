// src/components/ImageUploadModal.js
import React, { useState } from "react";
import "../styles/Modals.css";

const ImageUploadModal = ({ onClose, onImageSelect }) => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInsertImage = () => {
    if (imageSrc) {
      onImageSelect(imageSrc);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Insert Image</h3>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imageSrc && (
          <div className="image-preview">
            <img src={imageSrc} alt="Preview" />
          </div>
        )}
        <div className="modal-buttons">
          <button onClick={handleInsertImage} disabled={!imageSrc}>
            Insert
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
