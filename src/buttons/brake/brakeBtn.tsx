import "./brakeBtn.css";
import React from "react";
import { AnimatePresence, motion } from "motion/react";

interface ButtonProps {
  name: string;
  className: string;
  onClick: any;
  disabled?: boolean;
}

export const BrakeButton: React.FC<ButtonProps> = ({ name, onClick, disabled }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={onClick}
        className={`brakeButton ${disabled ? "disabled" : ""}`}
      >
        {name}
      </motion.div>
    </AnimatePresence>
  );
};
