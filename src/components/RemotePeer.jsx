import {
  useRemoteVideo,
  useRemoteAudio,
  usePeerIds,
  useDataMessage,
} from "@huddle01/react/hooks";
import React, { useEffect, useRef, useState } from "react";
import { huddleClient } from "..";

const RemotePeer = (props) => {
  // console.log("RemotePeer Page", props.peerId);
  const { stream, state } = useRemoteVideo({ peerId: props.peerId });
  const { stream: audioStream } = useRemoteAudio({ peerId: props.peerId });
  const vidRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (stream && vidRef.current && state === "playable") {
      vidRef.current.srcObject = stream;

      vidRef.current.onloadedmetadata = async () => {
        try {
          console.log("here 2");
          vidRef.current?.play();
        } catch (error) {
          console.error(error);
        }
      };

      vidRef.current.onerror = () => {
        console.error("videoCard() | Error is hapenning...");
      };
    }
  }, [stream, state]);

  console.log(stream, audioStream);

  useEffect(() => {
    if (audioStream && audioRef.current) {
      audioRef.current.srcObject = audioStream;
      audioRef.current.onloadedmetadata = async () => {
        try {
          console.log("here 2");
          audioRef.current?.play();
        } catch (error) {
          console.error(error);
        }
      };

      audioRef.current.onerror = () => {
        console.error("AudioCard() | Error is hapenning...");
      };
    }
  }, [audioStream, state]);

  return (
    <div>
      {stream && (
        <div className="w-[200px] h-[125px] rounded-lg bg-black overflow-hidden">
          <video
            ref={vidRef}
            style={{ height: "100%" }}
            autoPlay
            muted
          ></video>
        </div>
      )}
      {audioStream && <audio ref={audioRef} autoPlay></audio>}
    </div>
  );
};

export default React.memo(RemotePeer);
