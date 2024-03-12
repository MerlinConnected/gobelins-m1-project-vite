import React, { useRef, useState, useEffect, createRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

import { useControls } from 'leva';
import { myPlayer } from 'playroomkit';
import { useDaronContext } from '../../provider/DaronProvider';

import { Model } from '../../models/car';

function Players({ ...props }) {
  const modelRefs = useRef([]);
  const { camera } = useThree();
  const { players } = useDaronContext();

  const me = myPlayer();

  const { targetPlayer } = useControls({
    targetPlayer: true,
  });

  useEffect(() => {
    modelRefs.current = Array(players.length)
      .fill()
      .map((_, i) => modelRefs.current[i] || createRef());
  }, [players.length, modelRefs.current]);

  useFrame(() => {
    if (!targetPlayer) return;
    if (me) {
      const player = players.find((p) => p.id === me.id);
      const model = modelRefs.current[players.indexOf(player)].current;

      if (model) {
        camera.lookAt(model.position);
        // console.log(camera.position);
        // camera.position.set(model.position.x, model.position.y.model.position.z);
      }
    }
  });

  return (
    <>
      {players.map((player, i) => {
        return (
          <Model
            key={player.id}
            position={[-i * 1.5, 0, 0]}
            color={player.state.profile.color}
            ref={modelRefs.current[i]}
          />
        );
      })}
    </>
  );
}

export default React.memo(Players);
