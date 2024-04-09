import { useLocalVideo, usePeerIds, useRoom } from "@huddle01/react/hooks";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import React, { useEffect, useRef, useState } from "react";
import RemotePeer from "../libs/huddle/RemotePeer";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [token, setToken] = useState("");
  const { peerIds } = usePeerIds();
  const videoRef = useRef(null);

  // const { stream, enableVideo, disableVideo, isVideoOn } = useLocalVideo();
  const { enableVideo, isVideoOn, stream, disableVideo } = useLocalVideo();

  const createRoom = async () => {
    const response = await fetch(
      "https://api.huddle01.com/api/v1/create-room",
      {
        method: "POST",
        body: JSON.stringify({
          title: "Huddle01 Room",
        }),
        headers: {
          "Content-type": "application/json",
          "x-api-key": "qX58fmJMe7G498Xb3tQ2Ifxt-wjiYouK",
        },
        cache: "no-cache",
      }
    );

    const data = await response.json();
    // const roomId = data.data.roomId;
    setToken(await createToken(data.data.roomId));

    setRoomId(data.data.roomId);
    console.log(roomId);
  };

  const createToken = async (roomID) => {
    const accessToken = new AccessToken({
      apiKey: "qX58fmJMe7G498Xb3tQ2Ifxt-wjiYouK",
      roomId: roomID,
      role: Role.HOST,
      permissions: {
        admin: true,
        canConsume: true,
        canProduce: true,
        canProduceSources: {
          cam: true,
          mic: true,
          screen: true,
        },
        canRecvData: true,
        canSendData: true,
        canUpdateMetadata: true,
      },
      options: {
        metadata: {
          // you can add any custom attributes here which you want to associate with the user
          walletAddress: "axit.eth",
        },
      },
    });

    const token = await accessToken.toJwt();
    console.log("accessToken", token);
    return token;
  };

  const { joinRoom, leaveRoom } = useRoom({
    onJoin: () => {
      console.log("Joined the room");
    },
    onLeave: () => {
      console.log("Left the room");
    },
  });

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  console.log(stream);

  // ***********************RND***********************
  return (
    <div>
      {/* <button onClick={() => handleAudio()}>audio</button> */}
      <div>
        {roomId && <div>{roomId}</div>}
        <button onClick={() => createRoom()}>Create Room</button>
      </div>
      <button onClick={() => createToken()}>Create Token</button>
      <div className="menu-query">
        <input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="room Id ..."
        />
        <button
          onClick={async () =>
            joinRoom({
              roomId,
              token: await createToken(roomId),
            })
          }
        >
          Join Room
        </button>
      </div>
      <button onClick={() => leaveRoom()}>Leave Room</button>
      <div>
        <button
          className="bg-blue-500 p-2 mx-2 rounded-lg"
          onClick={async () => {
            isVideoOn ? await disableVideo() : await enableVideo();
          }}
        >
          {isVideoOn ? "Disable Video" : "Enable Video"}
        </button>
      </div>
      <div>
        {/* {peerIds.map((peerId) => (
          <RemotePeer key={peerId} peerId={peerId} />
          // <div>{peerId}</div>
        ))} */}
        {isVideoOn && (
          <div className="w-[80%] h-[135px] rounded-lg bg-black my-2 overflow-hidden">
            <button
              onClick={async () => await disableVideo()}
              className="text-white absolute translate-x-[205px] z-10"
            >
              X
            </button>
            <video ref={videoRef} style={{ height: "100%" }} autoPlay></video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
