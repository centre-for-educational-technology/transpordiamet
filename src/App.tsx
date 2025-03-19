import { useState } from "react";
import "./App.css";

import DryIcon from "./assets/dry.svg";
import RainIcon from "./assets/rain.svg";
import SnowIcon from "./assets/snow.svg";

import { StartButton } from "./buttons/start/startBtn";
import { Road } from "./road";
import { BrakeButton } from "./buttons/brake/brakeBtn";
import { SpeedButton } from "./buttons/speed/speedBtn";
import { ConditionButton } from "./buttons/condition/conditionBtn";
import { CustomPopup } from "./popup";

const App = () => {
  const [drive, setDrive] = useState(false);
  const [brake, setBrake] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [activeSpeedBtn, setActiveSpeedBtn] = useState(null); //active speed button
  const [condition, setCondition] = useState<string | null>(null); //condition of the road
  const [activeConditionBtn, setActiveConditionBtn] = useState<string | null>(
    null
  ); //active condition button

  //Change the opacity of chosen speed button
  const handleSpeedChange = (newSpeed: any) => {
    setSpeed(newSpeed);
    setActiveSpeedBtn(newSpeed);
  };
  //Change the opacity of chosen speed button
  const speedBtnStyle = (speed: any) => ({
    opacity: activeSpeedBtn === speed ? "1" : "0.75",
  });
  //Change the opacity of chosen condition button
  const handleConditionChange = (newCondition: string) => {
    setCondition(newCondition);
    setActiveConditionBtn(newCondition);
  };
  //Change the opacity of chosen condition button
  const conditionBtnStyle = (condition: string) => ({
    opacity: activeConditionBtn === condition ? "1" : "0.75",
  });

  return (
    <div>
      <CustomPopup />
      <div className="speedBtnFlex">
        <SpeedButton
          name={"30"}
          style={speedBtnStyle(30)}
          onClick={() => handleSpeedChange(30)}
        ></SpeedButton>
        <SpeedButton
          name={"100"}
          style={speedBtnStyle(100)}
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
          name={"STOPP"}
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
            style={conditionBtnStyle("dry")}
          />
          <ConditionButton
            icon={RainIcon}
            condition="rain"
            isActive={condition === "rain"}
            onClick={() => handleConditionChange("rain")}
            style={conditionBtnStyle("rain")}
          />
          <ConditionButton
            icon={SnowIcon}
            condition="snow"
            isActive={condition === "snow"}
            onClick={() => handleConditionChange("snow")}
            style={conditionBtnStyle("snow")}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
