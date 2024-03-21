import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, MotionPathControls, useMotion } from '@react-three/drei';
import { Vector3 } from 'three';

import { myPlayer, usePlayerState } from 'playroomkit';

import Curves from '../curves/Curves';
import { useMemo } from 'react';

import Billboard from '../../components/billboard/Billboard';

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

  const [progress, setProgress] = useState(new Vector3(-index * 1.5, 0, 0));

  useEffect(() => {
    const newPosition = new Vector3(-index * 1.5, 0, -points);
    const animationDuration = 0.5;

    const animate = () => {
      const start = progress.clone();
      const end = newPosition;
      const startTime = Date.now();

      const updatePosition = () => {
        const elapsedTime = (Date.now() - startTime) / (animationDuration * 1000);
        if (elapsedTime < 1) {
          setProgress(start.clone().lerp(end, elapsedTime));
          requestAnimationFrame(updatePosition);
        } else {
          setProgress(end);
        }
      };
      updatePosition();
    };

    animate();
  }, [points]);

  return (
    <group>
      <MotionPathControls object={poi} debug smooth focusObject={poi} damping={0.6}>
        <Curves index={index} />
        <Loop poi={poi} points={points} />
      </MotionPathControls>
      <group ref={poi}>
        <Billboard player={player} />
      </group>
      {me?.id === id && <PerspectiveCamera makeDefault position={cameraPos} />}
    </group>
  );
}

export default React.memo(Player);
