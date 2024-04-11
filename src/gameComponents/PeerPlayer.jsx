import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import useStore from "../hooks/useStore";
import { useDataMessage, useLocalPeer } from "@huddle01/react/hooks";

const PeerPlayer = ({ remotePeerId }) => {
  const { peerId } = useLocalPeer();
  const [peerForward, setForward] = useState(false);
  const [peerBackward, setBackward] = useState(false);
  const [peerLeftward, setLeftward] = useState(false);
  const [peerRightward, setRightward] = useState(false);
  const [peerJump, setJump] = useState(false);
  const { sendData } = useDataMessage();

  useDataMessage({
    onMessage(payload, from, label) {
      if (label === "pos" && from === remotePeerId) {
        const { forward, backward, leftward, rightward, jump } =
          JSON.parse(payload);
        setForward(forward);
        setBackward(backward);
        setLeftward(leftward);
        setRightward(rightward);
        setJump(jump);
      }
    },
  });

  const body = useRef(null);

  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();
  const rapierWorld = world.raw();
  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  const start = useStore((state) => state.start);
  const end = useStore((state) => state.end);
  const restart = useStore((state) => state.restart);
  const blocksCount = useStore((state) => state.blocksCount);

  const jump = () => {
    const origin = body.current.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = rapierWorld.castRay(ray, 10, true);

    if (hit && hit.toi < 0.15) {
      body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
  };

  const reset = () => {
    body.current.setTranslation({ x: 0, y: 1, z: 0 });
    body.current.setLinvel({ x: 0, y: 0, z: 0 });
    body.current.setAngvel({ x: 0, y: 0, z: 0 });
  };

  useEffect(() => {
    // const unsubscribeReset = useStore.subscribe(
    //   (state) => state.phase,
    //   (value) => {
    //     if (value === "ready") reset();
    //   }
    // );

    // const unsubscribeAny = subscribeKeys(() => {
    //   start();
    // });

    if (peerJump) jump();

    return () => {
      // unsubscribeReset();
      // unsubscribeAny();
    };
  }, [peerJump]);

  useFrame((state, delta) => {
    /**
     * Controls
     */
    const { forward, backward, leftward, rightward, jump } = getKeys();
    sendData({
      to: "*",
      payload: JSON.stringify({ forward, backward, leftward, rightward, jump }),
      label: "pos",
    });

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (peerForward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (peerRightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    if (peerBackward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (peerLeftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    body.current.applyImpulse(impulse);
    body.current.applyTorqueImpulse(torque);

    /**
     * Camera
     */
    const bodyPosition = body.current.translation();
    if (remotePeerId == peerId) {
      const cameraPosition = new THREE.Vector3();
      cameraPosition.copy(bodyPosition);
      cameraPosition.z += 2.25;
      cameraPosition.y += 0.65;

      const cameraTarget = new THREE.Vector3();
      cameraTarget.copy(bodyPosition);
      cameraTarget.y += 0.25;

      smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
      smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

      state.camera.position.copy(smoothedCameraPosition);
      state.camera.lookAt(smoothedCameraTarget);
    }

    /**
     * Phases
     */
    if (bodyPosition.z < -(blocksCount * 4 + 2)) end();

    if (bodyPosition.y < -4) restart();
  });

  return (
    <RigidBody
      ref={body}
      colliders="ball"
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      position={[0, 1, 0]}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color="mediumpurple" />
      </mesh>
    </RigidBody>
  );
};

export default PeerPlayer;
