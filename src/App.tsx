import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
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
import { conditionMapper } from "./utils/conditionMapper";
import { slide as Menu } from "react-burger-menu";

const App = () => {
  const [drive, setDrive] = useState(false);
  const [brake, setBrake] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [condition, setCondition] = useState<string | null>(null); //condition of the road
  const [showEndPopup, setShowEndPopup] = useState(false);
  const [key, setKey] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 950);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 950);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menuElement = document.querySelector(".bm-menu");
      if (menuElement && !menuElement.contains(event.target as Node)) {
        setIsMenuOpen(false); // Close the menu
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const reset = () => {
    setDrive(false);
    setShowEndPopup(false);
    setBrake(false);
    setKey((prevKey) => prevKey + 1);
  };

  //Change the opacity of chosen speed button
  const handleSpeedChange = (newSpeed: any) => {
    setSpeed(newSpeed);
  };
  //Change the opacity of chosen speed button
  const speedBtnStyle = (speedNr: any) => ({
    opacity: speed === speedNr ? "1" : "0.75",
  });
  //Change the opacity of chosen condition button
  const handleConditionChange = (newCondition: string) => {
    setCondition(newCondition);
  };
  //Change the opacity of chosen condition button
  const conditionBtnStyle = (cond: string) => ({
    opacity: condition === cond ? "1" : "0.75",
  });

  //The end popup appears 0.5 seconds after the car stops
  const handleBrakingComplete = () => {
    setTimeout(() => {
      setShowEndPopup(true);
    }, 500);
  };

  const conditionEST = conditionMapper(condition || ""); //Condition in Estonian

  // Road friction coefficients for different conditions for calculating braking distance
  const roadFriction: { [key: string]: number } = {
    dry: 0.7,
    rain: 0.4,
    snow: 0.2,
  };

  // Slowdown of the car according to condition
  const slowdown: { [key: string]: number } = {
    dry: -9,
    rain: -6,
    snow: -3,
  };

  // Converting km/h to m/s
  const speedInMetersPerSecond = (speed * 5) / 18;

  // Calculating the car's braking distance according to chosen speed and road condition
  const calculateBrakingDistance = () => {
    const brakingDistance =
      Math.pow(speedInMetersPerSecond, 2) /
      (2 * (roadFriction[condition || "dry"] || 0.7) * 9.8);
    return brakingDistance.toFixed(0);
  };

  // Calculating the car's stopping distance by adding a 1 second reaction time to the braking distance
  const calculateStoppingDistance = () => {
    const stoppingDistance =
      parseFloat(calculateBrakingDistance()) + speedInMetersPerSecond;
    return stoppingDistance.toFixed(0);
  };

  // Calculating the car's stopping time according to chosen speed and road condition
  const calculateStoppingTime = () => {
    const stoppingTime =
      0 - speedInMetersPerSecond / slowdown[condition || "dry"];
    return stoppingTime.toFixed(0);
  };

  const menuStyles = {
    bmMenuWrap: {
      top: "0",
      left: "0",
      width: "100%", // Full width for horizontal layout
      height: "100%", // Adjust height for horizontal layout
    },
    bmMenu: {
      background: "rgba(214, 214, 214, 0.82)",
      overflow: "hidden",
    },
    bmBurgerButton: {
      position: "fixed",
      width: "48px",
      height: "48px",
      left: "20px", // Adjust as needed
      top: "20px", // Adjust as needed
      zIndex: "9000",
    },
    bmBurgerBars: {
      background: "black", // Change color based on menu state
    },
    bmItemList: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    bmItem: {
      display: "flex",
    },
  };
  const speedButtons = () => {
    return (
      <>
        <SpeedButton
          name={"30"}
          style={speedBtnStyle(30)}
          onClick={() => handleSpeedChange(30)}
        ></SpeedButton>
        <SpeedButton
          name={"50"}
          style={speedBtnStyle(50)}
          onClick={() => handleSpeedChange(50)}
        ></SpeedButton>
        <SpeedButton
          name={"90"}
          style={speedBtnStyle(90)}
          onClick={() => handleSpeedChange(90)}
        ></SpeedButton>
        <SpeedButton
          name={"100"}
          style={speedBtnStyle(100)}
          onClick={() => handleSpeedChange(100)}
        ></SpeedButton>
      </>
    );
  };

  const condButtons = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <>
      <CustomPopup
        //Popup that opens when the app is started
        className="welcomePopup"
        openOnMount={true}
        title="Tere tulemast!"
        message="Enne sõidu alustamist vali auto kiirus ja teeolud."
        buttonText="Sulge"
      />
      {showEndPopup && (
        <CustomPopup
          //Popup that opens when the car stops
          className="endPopup"
          title="Sõidu lõpp!"
          message={`Sinu auto pidurdas ${calculateBrakingDistance()} meetrit ja kogu peatumisteekond oli ${calculateStoppingDistance()} meetrit.<br /> Peale 1 sekundi reaktsiooniaega kulus autol peatumiseks ${calculateStoppingTime()} ${calculateStoppingTime() === "1" ? "sekund" : "sekundit"}.`}
          buttonText="Algusesse"
          isOpen={showEndPopup}
          onClose={() => reset()}
        />
      )}

      <div className="mainContainer">
        {isMobile ? (
          <Menu
            noOverlay
            styles={menuStyles}
            className="mobileMenu"
            width={"100%"}
            isOpen={isMenuOpen}
            onStateChange={({ isOpen }) => setIsMenuOpen(isOpen)}
          >
            <div>{speedButtons()}</div>
            <div>{condButtons()}</div>
          </Menu>
        ) : (
          <div className="modifiers">
            <div className="speedBtnFlex">{speedButtons()}</div>
            <div className="conditionBtnFlex">{condButtons()}</div>
          </div>
        )}

        <Road
          key={key}
          drive={drive}
          speed={speed}
          brake={brake}
          setBrake={setBrake}
          setDrive={setDrive}
          condition={condition}
          setCondition={setCondition}
          onBrakingComplete={handleBrakingComplete}
        />
        {drive ? (
          <BrakeButton
            name={"STOPP"}
            className={"customButton"}
            disabled={brake}
            onClick={() => {
              setBrake(true);
            }}
          />
        ) : (
          <div>
            {/* Tooltip */}
            <span
              {...(speed === 0 || !condition
                ? {
                    // Show tooltip if START button disabled
                    "data-tooltip-id": "startBtnTooltip",
                    "data-tooltip-content":
                      speed === 0 ? "Vali kiirus" : "Vali teeolu",
                  }
                : {})}
              style={{ display: "inline-block" }}
            >
              <StartButton
                name={"START"}
                disabled={speed === 0 || !condition}
                className={`customButton ${speed === 0 || !condition ? "disabled" : ""}`}
                onClick={() => {
                  setDrive(true);
                  setBrake(false);
                }}
              />
            </span>

            <Tooltip
              id="startBtnTooltip"
              place="top"
              style={{ backgroundColor: "white", color: "black" }}
            />
          </div>
        )}

        <div className="infoContainer">
          <p>Auto kiirus: {speed} km/h</p>
          <p>Teeolu: {conditionEST}</p>
        </div>
      </div>

      {/* Message that shows in portrait mode */}
      <div>
        <div className="rotate-message">
          <h2>Keerake seade külgvaatesse!</h2>
        </div>
      </div>
    </>
  );
};

export default App;
