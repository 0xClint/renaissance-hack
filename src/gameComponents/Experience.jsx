import React from "react";
import { Physics } from "@react-three/rapier";
import Base from "./Base";
import Player from "./Player";
import useStore from "../hooks/useStore";
import Light from "./Light";
import Effects from "./Effects";
import PeerPlayer from "./PeerPlayer";
import { usePeerIds, useLocalPeer } from "@huddle01/react/hooks";

const Experience = () => {
  const { peerIds } = usePeerIds();
  const { peerId } = useLocalPeer();
  const blocksCount = useStore((state) => state.blocksCount);

  return (
    <>
      <Physics>
        <color args={["#252731"]} attach="background" />
        <Light />
        <Base count={blocksCount} />
        {peerIds.map((remotePeerId) => (
          <PeerPlayer key={remotePeerId} remotePeerId={remotePeerId} />
        ))}
        <PeerPlayer key={peerId} remotePeerId={peerId} />
        {/* <Player /> */}
      </Physics>

      <Effects />
    </>
  );
};

export default Experience;
