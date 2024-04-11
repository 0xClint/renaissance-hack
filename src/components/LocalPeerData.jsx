import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../hooks/useStore";
import {
  useDataMessage,
  useLocalAudio,
  useLocalPeer,
  useLocalVideo,
} from "@huddle01/react/hooks";

const LocalPeerData = () => {
  // const [displayName] = useStore((state) => [state.displayName]);
  const [isCursorSharing, setCursorSharing] = useState(false);

  const { stream, enableVideo, disableVideo, isVideoOn } = useLocalVideo();
  const { enableAudio, disableAudio, isAudioOn } = useLocalAudio();

  const [cursorPosition, setCursorPosition] = useState({
    top: 0,
    left: 0,
  });

  const { sendData } = useDataMessage();

  const { metadata, updateMetadata } = useLocalPeer({
    displayName: "harry",
    avatarUrl: "#",
  });

  // useEffect(() => {
  //   const onMouseMove = (e) => {
  //     if (isCursorSharing) {
  //       const screenWidth = window.innerWidth;
  //       const screenHeight = window.innerHeight;
  //       const cursorWidth = 200; // adjust as needed
  //       const cursorHeight = 150; // adjust as needed
  //       const adjustedTop = Math.min(e.clientY, screenHeight - cursorHeight);
  //       const adjustedLeft = Math.min(e.clientX, screenWidth - cursorWidth);
  //   console.log(adjustedLeft)
  //       setCursorPosition({
  //         top: adjustedTop + 15,
  //         left: adjustedLeft + 15,
  //       });
  //       sendData({
  //         to: "*",
  //         payload: JSON.stringify({
  //           top: adjustedTop + 15,
  //           left: adjustedLeft + 15,
  //         }),
  //         label: "cursor",
  //       });
  //     }
  //   };
  //   document.addEventListener("mousemove", onMouseMove);
  //   return () => {
  //     document.removeEventListener("mousemove", onMouseMove);
  //   };
  // }, [isCursorSharing]);

  return (
    <div>
      <button
        className="bg-blue-500 p-2 mx-2 rounded-lg"
        onClick={() => {
          isVideoOn ? disableVideo() : enableVideo();
        }}
      >
        {isVideoOn ? "Disable Video" : "Enable Video"}
      </button>
      <button
        onClick={() => {
          isAudioOn ? disableAudio() : enableAudio();
        }}
      >
        {isAudioOn ? "Disable Audio" : "Enable Audio"}
      </button>

      <button onClick={() => setCursorSharing(!isCursorSharing)}>
        {isCursorSharing ? "Disable cursor" : "Enable Cursor"}
      </button>
    </div>
  );
};

export default LocalPeerData;
