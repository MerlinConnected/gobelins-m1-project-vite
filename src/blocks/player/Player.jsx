import React, { useRef, useState, useEffect, createRef } from 'react';
import { useFrame } from '@react-three/fiber';
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

  const lookAt = useRef(new Vector3(0, 0, 0));

  useFrame(({ camera }) => {
    if (!model.current) return;

    if (me?.id === id) {
      lookAt.current.set(model.current.position.x, model.current.position.y, model.current.position.z);
      camera.lookAt(lookAt.current);
    }
  });

  return (
    <group>
      <Model position={new Vector3(-index * 1.5, 0, -points)} color={state.profile.color} ref={model} />
      {me?.id === id && <PerspectiveCamera makeDefault position={[4, 5, 4]} />}
    </group>
  );
}

export default React.memo(Player);
