import React, { useRef, useState, useEffect, createRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, MotionPathControls, useMotion } from '@react-three/drei';
import { Vector3 } from 'three';

import { myPlayer, usePlayerState } from 'playroomkit';

import { Model } from '../../models/car';

import Curves from '../curves/Curves';
import { useMemo } from 'react';

function Loop({ poi, points }) {
  const motion = useMotion();

  useFrame((delta) => {
    const target = new Vector3().addVectors(poi.current.position, motion.tangent);
    poi.current.lookAt(target);

    const step = 20;
    const currentPoints = points / step;

    motion.current = currentPoints;
  });

  return null;
}

function Player({ player, index, ...props }) {
  const { id, state } = player;
  const me = myPlayer();
  const poi = useRef();

  const [points] = usePlayerState(player, 'points');

  const cameraPos = useMemo(() => {
    const pos = new Vector3(10, 8, 20);
    return pos;
  }, []);

  return (
    <group>
      <MotionPathControls object={poi} debug smooth focusObject={poi} damping={0.6}>
        <Curves index={index} />
        <Loop poi={poi} points={points} />
      </MotionPathControls>
      <Model color={state?.profile?.color} ref={poi} />
      {me?.id === id && <PerspectiveCamera makeDefault position={cameraPos} />}
    </group>
  );
}

export default React.memo(Player);
