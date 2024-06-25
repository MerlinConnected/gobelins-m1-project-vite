import React, { useRef } from 'react';
import Player from '../player/Player';
import { CornerTiles, StraightTiles } from '../tiles/Tiles';

import { tilesPath } from '../../utils/tilesPath';
import { usePlayerState } from 'playroomkit';

function calculateRange(dataArray, score) {
  if (dataArray.length === 0) {
    return 0;
  }

  let lastIndex = 0;
  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i].index <= score) {
      lastIndex = i;
    }
  }

  if (lastIndex === 0 && dataArray[0].index > score) {
    return 0;
  }

  const range = lastIndex + 1;
  return range;
}

function initialisePlayer(index, amount) {
  // set the position and the rotation of the object according to its index
  let position = [];
  let rotationY = 0;
  if (index === 0) {
    position = [0, 0, amount];
    rotationY = Math.PI;
  }
  if (index === 1) {
    position = [amount, 0, 0];
    rotationY = Math.PI;
  }
  if (index === 2) {
    position = [0, 0, -amount];
    rotationY = Math.PI;
  }
  if (index === 3) {
    position = [-amount, 0, 0];
    rotationY = Math.PI;
  }

  return { position, rotationY };
}

function Tiles({ players, amount, ...props }) {
  const ref = useRef(null);
  const playerPoints = [];

  players.forEach((player) => {
    const [points] = usePlayerState(player, 'points');
    playerPoints.push(points);
  });

  // const cornerRanges = playerPoints.map((points, i) => calculateRange(tilesPath[`player${i + 1}`].corner, points));
  // const straightRanges = playerPoints.map((points, i) => calculateRange(tilesPath[`player${i + 1}`].straight, points));

  return (
    <group ref={ref} {...props}>
      {players.map((player, i) => (
        <React.Fragment key={player.id}>
          <Player
            onClick={() => {
              console.log('clicked', player.state.name);
            }}
            key={player.id}
            player={player}
            index={i}
            {...initialisePlayer(i, amount)}
          />
          {/* <CornerTiles data={tilesPath[`player${i + 1}`].corner} range={cornerRanges[i]} /> */}
          {/* <StraightTiles data={tilesPath[`player${i + 1}`].straight} range={straightRanges[i]} /> */}
        </React.Fragment>
      ))}
    </group>
  );
}

export default React.memo(Tiles);
