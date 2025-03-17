import { useState } from "react";
import "./App.css";
import "./buttons/speed/speedBtn.css";

import DryIcon from "./assets/dry.svg";
import RainIcon from "./assets/rain.svg";
import SnowIcon from "./assets/snow.svg";

import { StartButton } from "./buttons/start/startBtn";
import { Road } from "./road";
import { BrakeButton } from "./buttons/brake/brakeBtn";
import { SpeedButton } from "./buttons/speed/speedBtn";
import { ConditionButton } from "./buttons/condition/conditionBtn";
import { Popup } from "./popup";

const App = () => {
  const [drive, setDrive] = useState(false);
  const [brake, setBrake] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [activeButton, setActiveButton] = useState(null); //active speed button
  const [condition, setCondition] = useState<string | null>(null); //condition of the road
  const [isOpen, setIsOpen] = useState(false); //pop-up

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

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
      <div className="popup">
        <input type="button" value="Open" onClick={togglePopup} />
        {isOpen && (
          <Popup
            content={
              <>
                <b>design your popup</b>
                <p>INFO2</p>
                <button>test button</button>
              </>
            }
            handleClose={togglePopup}
          />
        )}
      </div>

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
            icon={RainIcon}
            condition="rain"
            isActive={condition === "rain"}
            onClick={() => handleConditionChange("rain")}
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
