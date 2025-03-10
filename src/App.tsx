import { useState } from "react";
import "./App.css";
import "./buttons/speed/speedBtn.css";

import { StartButton } from "./buttons/start/startBtn";
import { Road } from "./road";
import { BrakeButton } from "./buttons/brake/brakeBtn";
import { SpeedButton } from "./buttons/speed/speedBtn";

const App = () => {
  const [drive, setDrive] = useState(false);
  const [brake, setBrake] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [activeButton, setActiveButton] = useState(null);
  const [condition, setCondition] = useState(null)

  //change the color of chosen speed button
  const handleSpeedChange = (newSpeed: any) => {
    setSpeed(newSpeed);
    setActiveButton(newSpeed);
  };
  //change the color of chosen speed button
  const buttonStyle = (speed: any) => ({
    backgroundColor: activeButton === speed ? "#cccccc" : "#f2f2f2",
  });

  return (
    <div>
      <div className="speedBtnFlex">
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
      </div>
      <Road drive={drive} speed={speed} brake={brake} setBrake={setBrake} setDrive={setDrive} condition={condition} setCondition={setCondition}/>
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
          disabled={speed===0}
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
