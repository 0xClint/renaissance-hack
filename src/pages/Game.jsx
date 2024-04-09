import React, { useState } from "react";
import { Crosshair, Experience, UI } from "../gameComponents";
import { Canvas } from "react-three-fiber";

const Game = () => {
  const [downgradedPerformance, setDowngradedPerformance] = useState(false);
  return (
    <div style={{ height: "100vh" }}>
      <UI>
        <Crosshair />
      </UI>
      <Canvas>
        <Experience />
      </Canvas>
    </div>
  );
};

export default Game;
