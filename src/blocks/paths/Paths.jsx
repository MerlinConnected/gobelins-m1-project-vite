import React, { useRef } from 'react';

import Player from '../player/Player';

export default function Paths({ players, amount, ...props }) {
  const ref = useRef();
  const modelRefs = useRef([]);

  const positionPlayer = (index) => {
    let position = [];
    for (let i = 0; i < players.length; i++) {
      if (i === index && i === 0) position = [0, 0, amount];
      if (i === index && i === 1) position = [amount, 0, 0];
      if (i === index && i === 2) position = [0, 0, -amount];
      if (i === index && i === 3) position = [-amount, 0, 0];
    }

    return position;
  };

  const rotationPlayer = (index) => {
    let rotationY = 0;
    for (let i = 0; i < players.length; i++) {
      if (i === index && i === 0) rotationY = Math.PI;
      if (i === index && i === 1) rotationY = -Math.PI / 2;
      if (i === index && i === 2) rotationY = 0;
      if (i === index && i === 3) rotationY = Math.PI / 2;
    }

    return rotationY;
  };

  return (
    <group ref={ref} {...props}>
      {players.map((player, i) => (
        <Player
          key={player.id}
          player={player}
          index={i}
          position={positionPlayer(i)}
          rotation-y={rotationPlayer(i)}
          ref={modelRefs.current[player.id]}
        />
      ))}
    </group>
  );
}
