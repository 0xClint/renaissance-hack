import { useSphere } from "@react-three/cannon";
import React from "react";

const Sphere = (props) => {
  const [sphereRef] = useSphere(() => ({
    mass: 1,
    args: 0.5,

    ...props,
  }));
  return (
    <mesh ref={sphereRef}  >
     
      <sphereBufferGeometry args={[0.5]} />
      <meshStandardMaterial color={"blue"}/>
    </mesh>
  );
};

export default Sphere;
