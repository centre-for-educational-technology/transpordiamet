//import Popup from 'reactjs-popup';

import React from "react";

interface PopupProps {
  handleClose: () => void;
  content: React.ReactNode;
}

export const Popup: React.FC<PopupProps> = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
};
