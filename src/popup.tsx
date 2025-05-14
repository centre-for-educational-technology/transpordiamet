import React, { useState, useEffect } from "react";
import "./popup.css";

interface PopupProps {
  title?: string;
  message?: string;
  buttonText?: string;
  onClose?: () => void;
  openOnMount?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  className?: string;
}

export const CustomPopup: React.FC<PopupProps> = ({
  title,
  message,
  buttonText,
  onClose,
  openOnMount = false,
  isOpen: propsIsOpen,
  onOpenChange,
  className
}) => {
  const [isOpenInternal, setIsOpenInternal] = useState(openOnMount);

  // Cheks if popup is open
  const isControlled = propsIsOpen !== undefined;
  const isOpenState = isControlled ? propsIsOpen : isOpenInternal;

  // Open the popup depening on whether it is controlled or not
  useEffect(() => {
    if(openOnMount) {
      if(!isControlled) {
        setIsOpenInternal(true);
      } else if (onOpenChange) {
        onOpenChange(true);
      }
    }
  }, [openOnMount, isControlled, onOpenChange]);

  // Close the popup when the button is clicked
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
        <div className={`popup-overlay ${className}`}> 
          <div className="popup-content">
            {title && <h2>{title}</h2>}
            {message && (
              <p dangerouslySetInnerHTML={{ __html: message }}></p>
            )}
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
