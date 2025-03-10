import "./startBtn.css";
import React from "react";
import { AnimatePresence, motion } from "motion/react";

interface ButtonProps {
  name: string;
  className: string;
  onClick: any;
  disabled: boolean;
}

export const StartButton: React.FC<ButtonProps> = ({
  name,
  onClick,
  disabled,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={!disabled ? onClick : null}
        className={`customButton ${disabled ? "disabled" : ""}`}
      >
        {name}
      </motion.div>
    </AnimatePresence>
  );
};
