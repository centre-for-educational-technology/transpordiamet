import "./speedBtn.css";
import React from "react";
import { AnimatePresence, motion } from "motion/react";

interface ButtonProps {
  name: string;
  onClick: any;
}

export const SpeedButton: React.FC<ButtonProps> = ({ name, onClick }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={onClick}
        className="speedButton"
      >
        {name}
      </motion.div>
    </AnimatePresence>
  );
};

