import { useStore } from "../hooks/useStore";
import React from "react";
import { Cube } from "./Cube";

export const Cubes = () => {
  const [cubes] = useStore((state) => [state.cubes]);

  return cubes.map((item, index) => {
    return <Cube key={index} position={item} id={index} />;
  });
};
