import React from "react";
import { Physics } from "@react-three/rapier";
import Base from "./Base";
import Light from "./Light";
import Effects from "./Effects";
import PeerPlayer from "./PeerPlayer";
import { useLocalPeer, usePeerIds } from "@huddle01/react/hooks";
import useStore from "../hooks/useStore";
import { setHashPosition } from "../libs/setPosition";

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
          <PeerPlayer
            key={remotePeerId}
            remotePeerId={remotePeerId}
            position={[setHashPosition(remotePeerId.slice(6)) / 2, 1, 0]}
          />
        ))}
        <PeerPlayer
          key={peerId}
          remotePeerId={peerId}
          position={[setHashPosition(peerId.slice(6)) / 2, 1, 0]}
        />
        {/* <Player /> */}
      </Physics>

      <Effects />
    </>
  );
};

export default Experience;
