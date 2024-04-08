import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, MotionPathControls, useMotion } from '@react-three/drei';
import { Vector3 } from 'three';

import { myPlayer, usePlayerState } from 'playroomkit';

import Curves from '../../components/curves/Curves';

import { Car } from '../../models/car';

import Billboard from '../../components/billboard/Billboard';

function Loop({ poi, points }) {
  const motion = useMotion();

  useFrame((delta) => {
    const target = new Vector3().addVectors(poi.current.position, motion.tangent);
    poi.current.lookAt(target);

    const step = 40;
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
    const pos = new Vector3(10, 8, 30);
    return pos;
  }, []);

  return (
    <group>
      <MotionPathControls object={poi} debug smooth focusObject={poi} damping={0.6}>
        <Curves index={index} />
        <Loop poi={poi} points={points} />
      </MotionPathControls>
      <group ref={poi}>
        {/* <Billboard player={player} position={[0, 2, 0]} /> */}
        <Car color={state?.profile?.color} />
      </group>
      {me?.id === id && <PerspectiveCamera makeDefault position={cameraPos} />}
    </group>
  );
}

export default React.memo(Player);
