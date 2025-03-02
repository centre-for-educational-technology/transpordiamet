import { useEffect, useRef, useState } from "react";
import "./road.css";
import { motion } from "motion/react";

export const Road = (props: any) => {
  const { drive, brake, speed: startSpeed, condition } = props;

  const [speed, setSpeed] = useState(0);
  const [position, setPosition] = useState(0);
  const [brakeFactor, setBrakeFactor] = useState(1);
  const requestRef = useRef(0);

  console.log(Math.max(0, speed - 1 / brakeFactor))
  const animate = () => {
    if (drive) {
      setPosition((prev) => prev + ((speed / 5) % window.innerWidth));
    }
    if (brake) {
      setPosition((prev) => prev + ((speed / 5) % window.innerWidth));
      setSpeed((prev) => Math.max(0, prev - 0.5 / brakeFactor));
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    setSpeed(startSpeed);
  }, [startSpeed]);

  useEffect(() => {
    switch (condition) {
      case "dry":
        setBrakeFactor(1);
        break;
      case "rain":
        setBrakeFactor(1.5);
        break;
      case "snow":
        setBrakeFactor(2);
        break;
      default:
        break;
    }
  }, [condition]);

  useEffect(() => {
    if (speed > 0 || brake) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [speed, condition, drive, brake]);

  return (
    <div className="roadBody">
      <div key={"road"} className={`road `}>
        <motion.div
          animate={{ x: -position }}
          transition={{ ease: "linear", duration: 0.1 }}
          className="lines"
        ></motion.div>
      </div>
    </div>
  );
};
