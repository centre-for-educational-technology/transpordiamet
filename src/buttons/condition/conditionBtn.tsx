import "./conditionBtn.css";
import React from "react";
import { AnimatePresence, motion } from "motion/react";

interface ButtonProps {
  icon: string;
  condition: string;
  isActive: boolean;
  onClick: any;
  style: any;
}

export const ConditionButton: React.FC<ButtonProps> = ({
  icon,
  condition,
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
        className="conditionButton"
        whileTap={{ scale: 0.95 }} //button clicking animation
      >
        <img
        src={icon}
        alt={condition}
        style={{ width: "90px", height: "90px" }}
      />
      </motion.div>
    </AnimatePresence>
  );
};
