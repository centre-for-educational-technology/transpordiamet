import React, { useState, useEffect } from "react";
import "./popup.css";

interface PopupProps {
  title?: string;
  message?: string;
  buttonText?: string;
  onClose: () => void;
  openOnMount?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export const CustomPopup: React.FC<PopupProps> = ({
  title,
  message,
  buttonText,
  onClose,
  openOnMount = false,
  isOpen: propsIsOpen,
  onOpenChange,
}) => {
  const [isOpenInternal, setIsOpenInternal] = useState(openOnMount);

  // Cheks if popup is open
  const isControlled = propsIsOpen !== undefined;
  const isOpenState = isControlled ? propsIsOpen : isOpenInternal;

  useEffect(() => {
    if(openOnMount) {
      if(!isControlled) {
        setIsOpenInternal(true);
      } else if (onOpenChange) {
        onOpenChange(true);
      }
    }
  }, [openOnMount, isControlled, onOpenChange]);

  const closePopup = () => {
    if(!isControlled) {
      setIsOpenInternal(false);
    }
    if(onOpenChange) {
      onOpenChange(false);
    }
    if(onClose) {
      onClose();
    }
  };

  if (!isOpenState) return null;

  return (
    <div>
      {isOpenState && (
        <div className="popup-overlay">
          <div className="popup-content">
            {title && <h2>{title}</h2>}
            {message && <p>{message}</p>}
            <button onClick={closePopup}>{buttonText}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export const usePopup = (initalState = false) => {
  const [isOpen, setIsOpen] = useState(initalState);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return { isOpen, open, close, toggle };
}
