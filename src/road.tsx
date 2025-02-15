import { useEffect } from "react";
import "./road.css";
import {
  easeOut,
  motion,
  useAnimate,
  EasingDefinition,
  useMotionValue,
} from "motion/react";

//Creating a div to draw a road on the screen
export const Road = (props: any) => {
  const { drive, brake, speed } = props;

  const [scope, animate] = useAnimate();

  const startTrans = {
    repeat: Infinity,
    duration: 10/speed,
    ease: "linear" as EasingDefinition,
    repeatType: "loop" as any,
  };

  

  const stopTrans = {
    duration: 2,
    ease: easeOut
  };

  const x = useMotionValue(0);

  

  const startAnimation = async () => {
    await animate(
      scope.current,
      {
        x: [x.get(), -120],
      },
      startTrans
    );
  };

  const stopAnimation = async () => {

    console.log(x.getPrevious());
    
    await animate(
      scope.current,
      { x: [ scope.current, x.get() -120] },
      stopTrans
    );
  };

  useEffect(() => {
    console.log('velo', x.get());
    
    if (drive) {
      
      startAnimation();
    } 
    if (brake){
        stopAnimation();
    }
  }, [drive, brake]);

  return (
    <div key={"road"} className={`road `}>
      <motion.div ref={scope} className={`lines`}></motion.div>

      {/* <motion.div ref={scope} className={`lines`} variants={variants} animate={animate ? 'start' : 'stop'}></motion.div> */}
    </div>
  );
};
