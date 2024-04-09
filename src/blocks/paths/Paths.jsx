import React, { useEffect, useRef } from 'react';
import Player from '../player/Player';

function initialisePlayer(index, amount) {
  // set the position and the roatation of the object according to its index
  let position = [];
  let rotationY = 0;
  if (index === 0) {
    position = [0, 0, amount];
    rotationY = Math.PI;
  }
  if (index === 1) {
    position = [amount, 0, 0];
    rotationY = -Math.PI / 2;
  }
  if (index === 2) {
    position = [0, 0, -amount];
    rotationY = 0;
  }
  if (index === 3) {
    position = [-amount, 0, 0];
    rotationY = Math.PI / 2;
  }

  return { position, rotationY };
}

function Tiles({ players, amount, ...props }) {
  const ref = useRef();

  return (
    <group ref={ref} {...props}>
      {players.map((player, i) => (
        <Player key={player.id} player={player} index={i} {...initialisePlayer(i, amount)} />
      ))}
    </group>
  );
}

export default Tiles;
