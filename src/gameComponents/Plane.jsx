import { usePlane } from "@react-three/cannon";
import React from "react";

export const Plane = () => {
  
  /** Plane collider */
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.25, 0],
    material: {
      friction: 0.1
    },
    collisionFilterGroup:11
  }));

  return (
    <mesh ref={ref} receiveShadow={true} scale={[30,30]}>
      <planeBufferGeometry />
      <meshPhongMaterial color={"skyblue"} receiveShadow />
    </mesh>
  );
};
