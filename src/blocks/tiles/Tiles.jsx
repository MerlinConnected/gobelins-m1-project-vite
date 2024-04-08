import React, { useEffect, useRef, createRef } from 'react';
// import { Flow, modifyShader } from 'three/examples/jsm/modifiers/CurveModifier.js';
import Player from '../player/Player';

function Tiles({ players, amount, ...props }) {
  const ref = useRef();
  const modelRefs = useRef([]);

  useEffect(() => {
    modelRefs.current = Array(players.length)
      .fill()
      .map((_, i) => modelRefs.current[i] || createRef());

    console.log(modelRefs.current);
  }, [players.length, modelRefs.current]);

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

export default Tiles;
