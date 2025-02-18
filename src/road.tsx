import { useEffect } from "react";
import "./road.css";
import {
  easeOut,
  motion,
  useAnimate,
  EasingDefinition,
  useMotionValue,
} from "motion/react";

export const Road = (props: any) => {
  const { drive, brake, speed } = props;

  const [scope, animate] = useAnimate();

  //road animation with Motion
  const startTrans = {
    repeat: Infinity,
    duration: 10 / speed,
    ease: "linear" as EasingDefinition,
    repeatType: "loop" as any,
  };

  //road animation when braking with Motion
  const stopTrans = {
    duration: 2,
    ease: easeOut,
  };

  const x = useMotionValue(0);

  //road driving animation is waiting for the click of the "start" button
  const startAnimation = async () => {
    //async allows to use "await"
    await animate(
      scope.current,
      {
        //the road is moving horizontally
        x: [x.get(), -120],
      },
      //animation configuration
      startTrans
    );
  };

  const stopAnimation = async () => {
    //console.log(x.getPrevious());

    await animate(
      scope.current,
      //the animation stops by slowing down
      { x: [scope.current, x.get() - 120] },
      stopTrans
    );
  };

  useEffect(() => {
    //console.log("velo", x.get());

    if (drive) {
      //if drive variable is truthly, the startAnimation is called
      startAnimation();
    }
    if (brake) {
      stopAnimation();
    }
  }, [drive, brake]); //the effect runs only when these values change

  return (
    <div className="roadBody">
      <div key={"road"} className={`road `}>
        <motion.div ref={scope} className={`lines`}></motion.div>

        {/* <motion.div ref={scope} className={`lines`} variants={variants} animate={animate ? 'start' : 'stop'}></motion.div> */}
      </div>
    </div>
  );
};
