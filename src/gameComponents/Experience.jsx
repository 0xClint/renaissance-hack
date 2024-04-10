import React, { useEffect, useRef, useState } from "react";
import { extend, useThree } from "react-three-fiber";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { Physics } from "@react-three/cannon";
import { Cube } from "./Cube";
import { Plane } from "./Plane";
import { Player } from "./Player";
import Map from "./Map";
import { TempPlayer } from "./TempPlayer";
import Sphere from "./Sphere";
import { Cubes } from "./Cubes";

extend({ PointerLockControls });

const Experience = ({ id, peerIds }) => {
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    const handleFocus = () => {
      controls.current.lock();
    };
    document.addEventListener("click", handleFocus);

    return () => {
      document.removeEventListener("click", handleFocus);
    };
  }, [gl]);

  useEffect(() => {
    camera.layers.enable(0);
    camera.layers.enable(1);
  }, [camera]);

  const [cursorPosition, setCursorPosition] = useState({
    top: 0,
    left: 0,
  });

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
        {peerIds?.map((peerId) => (
          <Player key={peerId} peerId={peerId} />
        ))}
        <TempPlayer />
        {/* <Player /> */}

        {/** Cubes */}
        <Cubes />
        {/* <Cube position={[0, 0, -5]} layers={1} />
        <Cube position={[-0.6, 0, -5]} /> */}
        <Sphere position={[2, 1, 1]} layers={1} />
        <Plane />
        <gridHelper />
        <axesHelper />
      </Physics>
    </>
  );
};

export default Experience;
