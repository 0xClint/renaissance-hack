import {
  useLocalPeer,
  useLocalVideo,
  usePeerIds,
  useLobby,
  useRoom,
} from "@huddle01/react/hooks";
import React, { useEffect, useRef, useState } from "react";
import { createAccessToken } from "../libs/huddle/createToken";
import LocalPeerData from "../components/LocalPeerData";
import RemotePeer from "../components/RemotePeer";
import { Link } from "react-router-dom";

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
        </div>
      </div>
    </div>
  );
};

export default Home;
