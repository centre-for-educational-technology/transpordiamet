import React, { useState, useEffect } from "react";
import "./popup.css";

export const CustomPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Open the popup when the component mounts
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Tere tulemast!</h2>
            <p>Enne startimist vali auto sõidukiirus ja ilmaolu.</p>
            <button onClick={closePopup}>Sulge</button>
          </div>
        </div>
      )}
    </div>
  );
};
