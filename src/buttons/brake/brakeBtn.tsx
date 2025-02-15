import "./brakeBtn.css";
import React from "react";
import { AnimatePresence, motion } from "motion/react";

interface ButtonProps {
  name: string;
  className: string;
  onClick: any;
}

export const BrakeButton: React.FC<ButtonProps> = ({ name, onClick }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={onClick}
        className="brakeButton"
      >
        {name}
      </motion.div>
    </AnimatePresence>
  );
};

