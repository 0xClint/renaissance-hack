import {
  useLocalPeer,
  useLocalVideo,
  usePeerIds,
  useRoom,
} from "@huddle01/react/hooks";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import React, { useEffect, useRef, useState } from "react";
// import RemotePeer from "../libs/huddle/RemotePeer";
import { createAccessToken } from "../libs/huddle/createToken";
import LocalPeerData from "../components/LocalPeerData";
import RemotePeer from "../components/RemotePeer";
import { Link, Link as NavLink, useNavigate } from "react-router-dom";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [displayName, setDisplayName] = useState("Harry");
  const [token, setToken] = useState("");
  const { peerIds } = usePeerIds();
  const videoRef = useRef(null);


  const { metadata, updateMetadata } = useLocalPeer({
    displayName,
    avatarUrl: "#",
  });

  const createAndJoinRoom = async () => {
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
    setRoomId(data.data.roomId);

    const userToken = await createAccessToken(data.data.roomId);
    await joinRoom({
      roomId: data.data.roomId,
      token: userToken,
    });

    console.log(roomId);
  };

  const { joinRoom, state: roomState } = useRoom({
    onJoin: () => {
      console.log("Joined the room");
    },
    onLeave: () => {
      console.log("Left the room");
    },
  });

  // useEffect(() => {
  //   if (stream && videoRef.current) {
  //     videoRef.current.srcObject = stream;
  //   }
  // }, [stream]);

  console.log(peerIds);

  // ***********************RND***********************
  return (
    <div>
      <div>
        {roomId && <div>{roomId}</div>}
        <button onClick={() => createAndJoinRoom()}>
          Create and Join Room
        </button>
        <div className="menu-query">
          <input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="room Id ..."
          />
          <button
            onClick={async () => {
              if (roomId) {
                return joinRoom({
                  roomId,
                  token: await createAccessToken(roomId),
                });
              }
            }}
          >
            Join Room
          </button>
          {roomId && <Link to={`/game/${roomId}`}>Enter room</Link>}
        </div>
        {peerIds.length && <LocalPeerData />}
        <div>
          {peerIds.map((peerId) => (
            <RemotePeer key={peerId} peerId={peerId} />
            // <div>{peerId}</div>
          ))}
          {/* {isVideoOn && (
            <div className="w-[80%] h-[135px] rounded-lg bg-black my-2 overflow-hidden">
              <button
                onClick={async () => await disableVideo()}
                className="text-white absolute translate-x-[205px] z-10"
              >
                X
              </button>
              <video ref={videoRef} style={{ height: "100%" }} autoPlay></video>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Home;

{
  /* <div>
<button onClick={() => handleAudio()}>audio</button>
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
  {peerIds.map((peerId) => (
    <RemotePeer key={peerId} peerId={peerId} />
    // <div>{peerId}</div>
  ))}
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
</div> */
}
