import "./conditionBtn.css";
import React from "react";
//import { AnimatePresence, motion } from "motion/react";

interface ButtonProps {
  className: string;
  icon: string;
  condition: string;
  isActive: boolean;
  onClick: any;
}

export const ConditionButton: React.FC<ButtonProps> = ({
  icon,
  condition,
  isActive,
  onClick,
}) => {
  return (
    <button
      className="conditionButton"
      onClick={onClick}
      style={{
        border: "none",
        background: "none",
        cursor: "pointer",
        opacity: isActive ? 1 : 0.6,
      }}
    >
      <img
        src={icon}
        alt={condition}
        style={{ width: "90px", height: "90px" }}
      />
    </button>
  );
};
