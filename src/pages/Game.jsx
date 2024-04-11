import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Experience } from "../gameComponents";
import { KeyboardControls } from "@react-three/drei";
import { useDataMessage, usePeerIds, useRoom } from "@huddle01/react/hooks";
import { createAccessToken } from "../libs/huddle/createToken";
import Interface from "../gameComponents/Interface";
import { bgIcon } from "../assets";
import Lottie from "react-lottie-player";
import loaderGif from "../assets/loader.json";

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
      <div>
        <img src={bgIcon} className="absolute -z-10  w-[100vw]" />
        <div className=" ">
          <div className="control setting menu absolute h-screen w-screen make-flex">
            <div className="control z-10 setting menu absolute top-[500px]]">
              <div
                className="absolute right-1 justify-end px-2 pt-2 cursor-pointer"
                // onClick={() => setControlMenu(false)}
              >
                <span className=" font-bold">X</span>
              </div>
              <div className=" z-100 menu-container w-[500px]  py-8 card-container make-flex flex-col  ">
                <h3 className="text-lg font-bold">Waiting for your friend to join...</h3>

                <Lottie
                  loop
                  animationData={loaderGif}
                  play
                  style={{
                    width: 150,
                    height: 150,
                  }}
                />

                <p
                  onClick={() => {
                    navigator.clipboard.writeText(currentUrl);
                  }}
                  className="text-blue-800 font-semibold underline cursor-pointer"
                >
                  click to copy invite link
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          <Interface />
        </KeyboardControls>
      )}
    </div>
  );
};

export default Game;
