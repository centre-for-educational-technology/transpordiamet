import "./speedBtn.css";
import React from "react";
import { AnimatePresence, motion } from "motion/react";

interface ButtonProps {
  name: string;
  onClick: any;
  style: any;
}

export const SpeedButton: React.FC<ButtonProps> = ({
  name,
  onClick,
  style,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }} //animation when button appears on the screen
        onClick={onClick}
        style={style}
        className="speedButton"
        whileTap={{ scale: 0.95 }} //button clicking animation
      >
        {name}
      </motion.div>
    </AnimatePresence>
  );
};
