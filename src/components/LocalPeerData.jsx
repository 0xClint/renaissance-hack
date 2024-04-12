import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../hooks/useStore";
import {
  useDataMessage,
  useLocalAudio,
  useLocalPeer,
  useLocalVideo,
  usePeerIds,
} from "@huddle01/react/hooks";
import { FaVideo, FaVideoSlash } from "react-icons/fa";
import { IoMdMic, IoMdMicOff } from "react-icons/io";
import RemotePeer from "./RemotePeer";
import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";

const LocalPeerData = () => {
  const { peerIds } = usePeerIds();
  const [isCursorSharing, setCursorSharing] = useState(false);

  const { stream, enableVideo, disableVideo, isVideoOn } = useLocalVideo();
  const { enableAudio, disableAudio, isAudioOn } = useLocalAudio();

  const { metadata, updateMetadata } = useLocalPeer({
    displayName: "harry",
    avatarUrl: "#",
  });

  const videoRef = useRef(null);
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="absolute top-3 left-1 flex gap-2">
      <div className="w-[200px] h-[125px]">
        {isVideoOn ? (
          <div className="w-[200px] h-[125px] rounded-lg bg-black overflow-hidden">
            <button
              onClick={async () => await disableVideo()}
              className="text-white absolute translate-x-[82px] z-10"
            >
              X
            </button>
            <video ref={videoRef} style={{ height: "100%" }} autoPlay></video>
          </div>
        ) : (
          <div className=" h-[45px]"></div>
        )}
        {peerIds.map((peerId) => (
          <RemotePeer key={peerId} peerId={peerId} />
        ))}
      </div>
      <div className="flex gap-2">
        <button
          className="btn h-10 w-10  text-lg "
          onClick={() => {
            isVideoOn ? disableVideo() : enableVideo();
          }}
        >
          {isVideoOn ? <FaVideoSlash /> : <FaVideo />}
        </button>
        <button
          className="btn p-2 text-xl h-10"
          onClick={() => {
            isAudioOn ? disableAudio() : enableAudio();
          }}
        >
          {isAudioOn ? <IoMdMicOff /> : <IoMdMic />}
        </button>
        <Link to="/" className="btn p-2 text-xl h-10">
          <GoHomeFill />
        </Link>
      </div>
    </div>
  );
};

export default LocalPeerData;
