import React, { useEffect, useState } from "react";
import { Crosshair, Experience, UI } from "../gameComponents";
import { Canvas } from "react-three-fiber";
import { useParams } from "react-router-dom";
import { useDataMessage, usePeerIds, useRoom } from "@huddle01/react/hooks";
import { createAccessToken } from "../libs/huddle/createToken";
import Loader from "../components/Loader";
import { useStore } from "../hooks/useStore";

const Game = () => {
  const { id } = useParams();
  const { peerIds } = usePeerIds();
  const { sendData } = useDataMessage();
  const [postData, setPostData] = useStore((state) => [state.postData]);

  const [loader, setLoader] = useState(false);

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
      <div className=" ">
        <div className="text-[2rem] font-semibold">waiting for player 2</div>
      </div>
      {peerIds.length && (
        <>
          <UI>
            <Crosshair />
          </UI>
          <Canvas>
            <Experience id={id} peerIds={peerIds} />
          </Canvas>
        </>
      )}
      {loader && <Loader />}
    </div>
  );
};

export default Game;
