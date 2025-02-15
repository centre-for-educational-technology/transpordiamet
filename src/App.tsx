import { useState } from "react";
import "./App.css";

import { StartButton } from "./buttons/start/startBtn";
import { Road } from "./road";
import { BrakeButton } from "./buttons/brake/brakeBtn";
import { SpeedButton } from "./buttons/speed/speedBtn";

//Adding the road.tsx div
const App = () => {
  const [drive, setDrive] = useState(false);
  const [brake, setBrake] = useState(false);
  const [speed, setSpeed] = useState(30);

  return (
    <div>
      <SpeedButton name={"30"} onClick={() => setSpeed(30)}></SpeedButton>
      <SpeedButton name={"100"} onClick={() => setSpeed(100)}></SpeedButton>
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
