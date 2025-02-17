import { useState } from "react";
import "./App.css";

import { StartButton } from "./buttons/start/startBtn";
import { Road } from "./road";
import { BrakeButton } from "./buttons/brake/brakeBtn";
import { SpeedButton } from "./buttons/speed/speedBtn";

const App = () => {
  const [drive, setDrive] = useState(false);
  const [brake, setBrake] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [activeButton, setActiveButton] = useState(null);

  //change the color of chosen speed button
  const handleSpeedChange = (newSpeed: any) => {
    setSpeed(newSpeed);
    setActiveButton(newSpeed);
  };
  //change the color of chosen speed button
  const buttonStyle = (speed: any) => ({
    backgroundColor: activeButton === speed ? "#b6b6b6" : "#929292",
  });

  return (
    <div>
      <SpeedButton
        name={"30"}
        style={buttonStyle(30)}
        onClick={() => handleSpeedChange(30)}
      ></SpeedButton>
      <SpeedButton
        name={"100"}
        style={buttonStyle(100)}
        onClick={() => handleSpeedChange(100)}
      ></SpeedButton>
      <Road drive={drive} speed={speed} brake={brake} />
      {drive ? (
        <BrakeButton
          name={"BRAKE"}
          className={"customButton"}
          onClick={() => {
            setBrake(true);
            setDrive(false);
          }}
        />
      ) : (
        <StartButton
          name={"START"}
          className={"customButton"}
          onClick={() => {
            setDrive(true);
            setBrake(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
