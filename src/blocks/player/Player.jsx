import React, { useMemo, useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import { myPlayer, usePlayerState } from 'playroomkit';
import { animate } from 'framer-motion';

import Billboard from '../../components/billboard/Billboard';
import Path from '../../utils/paths';

import { Model } from '../../models/car';

function Player({ player, index, ...props }) {
  const { position, rotationY } = props;
  const { id, state } = player;

  const ref = useRef();
  const camRef = useRef();
  const [prevPoints, setPrevPoints] = useState(0);

  const me = myPlayer();
  const [points] = usePlayerState(player, 'points');

  const cameraPos = useMemo(() => {
    const pos = new THREE.Vector3(position[0], position[1], position[2]);
    return pos;
  }, [player]);

  const path = useMemo(() => Path[index], [index]);

  const targetIndex = useMemo(() => {
    let targetIndex = Math.min(points, path.length - 1);
    return targetIndex;
  }, [points, path]);

  const targetPosition = useMemo(() => path[targetIndex], [path, targetIndex]);

  useEffect(() => {
    if (me?.id === id) {
      // set the camera pos next to the player
      camRef.current.position.copy(cameraPos);

      let tempVec = new THREE.Vector3();
      ref.current.getWorldDirection(tempVec);
      camRef.current.position.addScaledVector(tempVec, -20);
      tempVec.cross(new THREE.Vector3(0, 1, 0)).normalize();
      camRef.current.position.addScaledVector(tempVec, 2);
      camRef.current.position.y += 3;
    }
  }, [player]);

  useEffect(() => {
    if (points !== prevPoints) {
      setPrevPoints(points);
      animateToTargetPosition();
    }
  }, [points]);

  const animateToTargetPosition = () => {
    const startPosition = ref.current.position.clone();
    const endPosition = new THREE.Vector3(targetPosition.x, position[1], targetPosition.z);

    const duration = 1;
    let elapsedTime = 0;

    const movePlayer = () => {
      elapsedTime += 1 / 60;
      const t = Math.min(elapsedTime / duration, 1);

      ref.current.position.lerpVectors(startPosition, endPosition, t);

      if (t < 1) {
        requestAnimationFrame(movePlayer);
      }
    };

    movePlayer();
  };

  return (
    <>
      <group ref={ref} rotation-y={rotationY} {...props}>
        <Billboard player={player} position={[0, 2, 0]} />
        <Model color={state?.profile?.color} />
      </group>
      {me?.id === id && <PerspectiveCamera ref={camRef} makeDefault />}
    </>
  );
}

export default Player;
