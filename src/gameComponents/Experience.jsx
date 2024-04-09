import React, { useEffect, useRef } from "react";
import { extend, useThree } from "react-three-fiber";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { Physics } from "@react-three/cannon";
import { Cube } from "./Cube";
import { Plane } from "./Plane";
import { Player } from "./Player";
import Map from "./Map";

extend({ PointerLockControls });

const Experience = () => {
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    camera.layers.enable(0);
    camera.layers.enable(1);
  }, [camera]);

  useEffect(() => {
    const handleFocus = () => {
      controls.current.lock();
    };
    document.addEventListener("click", handleFocus);

    return () => {
      document.removeEventListener("click", handleFocus);
    };
  }, [gl]);

  return (
    <>
      {/** Pointer lock */}
      <pointerLockControls ref={controls} args={[camera, gl.domElement]} />
      {/** Lighting */}
      <directionalLight position={[3, 0, 3]} intensity={0.5} castShadow />
      <pointLight position={[0, 0, -3]} intensity={0.6} castShadow />
      <pointLight position={[0, 0, 4]} intensity={0.6} castShadow />
      <ambientLight intensity={0.6} />

      {/* Physic */}
      <Physics
        gravity={[0, -9, 0]}
        tolerance={0}
        iterations={50}
        broadphase={"SAP"}
      >
        {/** Player */}
        <Player />
        <Map />
        <Plane />

        {/** Cubes */}
        <Cube position={[0, 0, -5]} layers={1} />
        <Cube position={[-0.6, 0, -5]} />
      </Physics>
    </>
  );
};

export default Experience;
