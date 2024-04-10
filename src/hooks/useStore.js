import create from "zustand";
import { cubesPos } from "../libs/preData";

export const useStore = create((set) => ({
  postData: {
    horizontal: "",
    vertical: "",
    cameraDirection: { x: 0, y: 0, z: 0 },
  },
  setPostData: (horizontal, vertical, cameraDirection) => {
    set(() => ({ postData: { horizontal, vertical, cameraDirection } }));
  },
  peerData: {
    horizontal: "",
    vertical: "",
    cameraDirection: { x: 0, y: 0, z: 0 },
  },
  setPeerData: (horizontal, vertical, cameraDirection) => {
    set(() => ({ postData: { horizontal, vertical, cameraDirection } }));
  },
  displayName: "Harry",
  setDisplayName: (name) => {
    set(() => ({ displayName: name }));
  },
  cubes: [...cubesPos] || [],
}));
