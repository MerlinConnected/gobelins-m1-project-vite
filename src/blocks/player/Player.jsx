import React, { useRef, useState, useEffect, createRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Vector3 } from 'three';

import { useControls } from 'leva';
import { myPlayer } from 'playroomkit';

import { Model } from '../../models/car';
import { usePlayerState } from 'playroomkit';

function Player({ player, index, ...props }) {
  const { id, state } = player;
  const model = useRef();
  const me = myPlayer();

  const [points] = usePlayerState(player, 'points');
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

  useFrame(({ camera }) => {
    if (!model.current) return;

    if (me?.id === id) {
      camera.lookAt(model.current.position);
    }
  });

  return (
    <group>
      <Model position={progress} color={state?.profile?.color} ref={model} />
      {me?.id === id && <PerspectiveCamera makeDefault position={progress.clone().add(new Vector3(4, 5, 4))} />}
    </group>
  );
}

export default React.memo(Player);
