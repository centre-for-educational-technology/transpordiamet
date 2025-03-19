import { useEffect, useRef, useState } from "react";
import "./road.css";
import { motion } from "motion/react";
//import { ConditionButton } from "./buttons/condition/conditionBtn";

export const Road = (props: any) => {
  const { drive, brake, speed: startSpeed, condition } = props;

  const [speed, setSpeed] = useState(0);
  const [position, setPosition] = useState(0);
  const [brakeFactor, setBrakeFactor] = useState(1);
  const requestRef = useRef(0);

  //Change the color of the road according to the chosen condition of the road
  const getRoadStyle = () => {
    switch (condition) {
      case "dry":
        return { background: "#666666" };
      case "rain":
        return { background: "#404040" };
      case "snow":
        return { background: "#a6a6a6" };
      default:
        return { background: "#666666" };
    }
  };

  //Change the color of the road bewteen the lines accordin to the chosen condition
  const getLineStyle = () => {
    const lineWidth = 80;
    const gapWidth = 20;

    switch (condition) {
      case "dry":
        return {
          background: `repeating-linear-gradient(
            90deg,
            #fff,
            #fff ${lineWidth}px,
            #666666 ${lineWidth}px,
            #666666 ${lineWidth + gapWidth}px
          )`,
        };
      case "rain":
        return {
          background: `repeating-linear-gradient(
            90deg,
            #fff,
            #fff ${lineWidth}px,
            #404040 ${lineWidth}px,
            #404040 ${lineWidth + gapWidth}px
          )`,
        };
      case "snow":
        return {
          background: `repeating-linear-gradient(
            90deg,
            #fff,
            #fff ${lineWidth}px,
            #a6a6a6 ${lineWidth}px,
            #a6a6a6 ${lineWidth + gapWidth}px
          )`,
        };
      default:
        return {
          background: `repeating-linear-gradient(
            90deg,
            #fff,
            #fff ${lineWidth}px,
            #666666 ${lineWidth}px,
            #666666 ${lineWidth + gapWidth}px
          )`,
        };
    }
  };

  console.log(Math.max(0, speed - 1 / brakeFactor));
  //Road animation
  const animate = () => {
    //If Drive is true, the position is updated
    if (drive) {
      setPosition((prev) => prev + ((speed / 5) % window.innerWidth));
    }
    //If Brake is true, the speed is reduced
    if (brake) {
      setPosition((prev) => prev + ((speed / 5) % window.innerWidth));
      setSpeed((prev) => Math.max(0, prev - 0.5 / brakeFactor));
    }
    //Recursively calling Animate to create a loop
    requestRef.current = requestAnimationFrame(animate);
  };

  //Speed of the car is updated when startSpeed changes
  useEffect(() => {
    setSpeed(startSpeed);
  }, [startSpeed]);

  //Braking is updated according to the road condition. Whenever the condition changes, useEffect runs.
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
      default: //If condition has an unexpected value, the code doesn't break
        break;
    }
  }, [condition]);

  //Road animation loop starts when the car is moving or braking
  useEffect(() => {
    if (speed > 0 || brake) {
      requestRef.current = requestAnimationFrame(animate);
    } //Otherwise the loop is stopped (or when dependencies change)
    return () => cancelAnimationFrame(requestRef.current);
  }, [speed, condition, drive, brake]);

  return (
    <div className="roadBody">
      <div key={"road"} className={`road `} style={getRoadStyle()}>
        <motion.div
          animate={{ x: -position }}
          transition={{ ease: "linear", duration: 0.1 }}
          className="lines"
          style={getLineStyle()}
        ></motion.div>
      </div>
    </div>
  );
};
