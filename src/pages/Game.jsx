import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { Experience } from "../gamecomponents";
import { usePeerIds, useRoom } from "@huddle01/react/hooks";
import { KeyboardControls } from "@react-three/drei";
import { useParams } from "react-router-dom";
import { createAccessToken } from "../libs/huddle/createToken";
import { bgIcon } from "../assets";
import { Header } from "../components";
import LocalPeerData from "../components/LocalPeerData";

const Game = () => {
  const { id } = useParams();
  const { peerIds } = usePeerIds();
  const currentUrl = window.location.href;

  const { joinRoom, state: roomState } = useRoom({
    onJoin: () => {
      console.log("Joined the room");
    },
    onLeave: () => {
      console.log("Left the room");
    },
  });

  useEffect(() => {
    const joinGameRoom = async () => {
      await joinRoom({ roomId: id, token: await createAccessToken(id) });
    };
    joinGameRoom();
  }, [id]);

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <div
        className="absolute  cursor-pointer z-10 left-1 icon-container gap-2"
        style={{ width: "280px", height: "10px" }}
      >
        <LocalPeerData />
      </div>
      <div className=""></div>
      {!peerIds.length && (
        <div>
          <img src={bgIcon} className="absolute -z-10  w-[100vw]" />
          <div className=" ">
            <div className="control setting menu absolute h-screen w-screen make-flex">
              <div className="control z-10 setting menu absolute top-[400px]]">
                <div
                  className="absolute right-1 justify-end px-2 pt-2 cursor-pointer"
                  // onClick={() => setControlMenu(false)}
                >
                  <span className=" font-bold">X</span>
                </div>
                <div className=" z-100 menu-container w-[500px]  py-8 card-container make-flex flex-col  ">
                  <h3 className="text-lg font-bold">
                    Waiting for your friend to Join...
                  </h3>
                  <div className="loader my-10"></div>
                  <div className="font-semibold">
                    Room id: <span className="text-lg">{id}</span>{" "}
                  </div>
                  <p
                    onClick={() => {
                      navigator.clipboard.writeText(currentUrl);
                    }}
                    className="text-blue-800 font-semibold underline cursor-pointer"
                  >
                    copy invite link
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {peerIds.length && (
        <KeyboardControls
          map={[
            { name: "forward", keys: ["ArrowUp", "KeyW"] },
            { name: "backward", keys: ["ArrowDown", "KeyS"] },
            { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
            { name: "rightward", keys: ["ArrowRight", "KeyD"] },
            { name: "jump", keys: ["Space"] },
          ]}
        >
          <Canvas>
            <axesHelper />
            <Experience />
          </Canvas>
        </KeyboardControls>
      )}
    </div>
  );
};

export default Game;
