import { useKeyboardControls } from "@react-three/drei";
import { addEffect } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import useStore from "../hooks/useStore";

const Interface = () => {
  const time = useRef(null);

  const restart = useStore((state) => state.restart);
  const phase = useStore((state) => state.phase);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useStore.getState();

      let elapsedTime = 0;

    //   if (state.phase === "playing") elapsedTime = Date.now() - state.startTime;
    //   else if (state.phase === "ended")
        elapsedTime = state.endTime - state.startTime;

      elapsedTime /= 1000;
      //   elapsedTime = Number(elapsedTime.toFixed(2));
      //   if (time.current) time.current.textContent = elapsedTime.toString();

      const formattedTime = elapsedTime.toFixed(2);


      const [seconds, decimal] = formattedTime.split(".");
      const milliseconds = Math.round(parseFloat(`0.${decimal}`) * 100);
      if (time.current) time.current.textContent = `${seconds}`;
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <div className="interface">
      {/* Time */}
      <div ref={time} className="time">
        0.00
      </div>

      {/* Restart */}
      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}

      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? "active" : ""}`}></div>
          <div className={`key ${backward ? "active" : ""}`}></div>
          <div className={`key ${rightward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : ""}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Interface;
