import { useState } from "react";
import "./App.css";
import "./buttons/speed/speedBtn.css";

import DryIcon from "./assets/dry.svg";
//import RainIcon from "./assets/rain.svg";
import SnowIcon from "./assets/snow.svg";

import { StartButton } from "./buttons/start/startBtn";
import { Road } from "./road";
import { BrakeButton } from "./buttons/brake/brakeBtn";
import { SpeedButton } from "./buttons/speed/speedBtn";
import { ConditionButton } from "./buttons/condition/conditionBtn";

const App = () => {
  const [drive, setDrive] = useState(false);
  const [brake, setBrake] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [activeButton, setActiveButton] = useState(null);
  const [condition, setCondition] = useState<string | null>(null);

  //change the color of chosen speed button
  const handleSpeedChange = (newSpeed: any) => {
    setSpeed(newSpeed);
    setActiveButton(newSpeed);
  };
  //change the color of chosen speed button
  const buttonStyle = (speed: any) => ({
    backgroundColor: activeButton === speed ? "#cccccc" : "#f2f2f2",
  });

  const handleConditionChange = (newCondition: string) => {
    setCondition(newCondition);
  };

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

      <Road
        drive={drive}
        speed={speed}
        brake={brake}
        setBrake={setBrake}
        setDrive={setDrive}
        condition={condition}
        setCondition={setCondition}
      />
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
          disabled={speed === 0}
          className={"customButton"}
          onClick={() => {
            setDrive(true);
            setBrake(false);
          }}
        />
      )}

      <div className="conditionButtons">
        <div className="conditionBtnFlex">
          <ConditionButton
            icon={DryIcon}
            condition="dry"
            isActive={condition === "dry"}
            onClick={() => handleConditionChange("dry")}
            style={undefined}
          />
          <ConditionButton
            icon={SnowIcon}
            condition="snow"
            isActive={condition === "snow"}
            onClick={() => handleConditionChange("snow")}
            style={undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
