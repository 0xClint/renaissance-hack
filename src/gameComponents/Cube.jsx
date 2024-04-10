import React, { useEffect, useMemo } from "react";
import { useBox } from "@react-three/cannon";
// import niceColors from "nice-color-palettes";

// Constants
const paletteIndex = 8;

export const Cube = (props) => {
  const [cubeRef, api] = useBox(() => ({
    mass: 1,
    args: [0.5, 0.5, 0.5],
    material: {
      friction: 1,
      restitution: 0,
    },
    ...props,
    collisionFilterGroup: 10,

    onCollide: (e) => {
      if (e.collisionFilters.bodyFilterGroup == 1) console.log("collision");
    },
  }));

  useEffect(() => {
    // api.collisionFilterGroup.subscribe((v) => console.log(v));
  }, [api]);

  return (
    <mesh ref={cubeRef} castShadow layers={props.layers}>
      <boxBufferGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
      <meshLambertMaterial color={"black"} />
    </mesh>
  );
};
