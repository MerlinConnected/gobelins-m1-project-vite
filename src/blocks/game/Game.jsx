import React, { useRef, useEffect, createRef } from 'react';

import Player from '../player/Player';

import { usePlayerContext } from '../../provider/PlayerProvider';

const Game = () => {
  const { players } = usePlayerContext();

  const modelRefs = useRef([]);

  useEffect(() => {
    modelRefs.current = Array(players.length)
      .fill()
      .map((_, i) => modelRefs.current[i] || createRef());
  }, [players.length, modelRefs.current]);

  return (
    <group>
      {players.map((player, i) => (
        <Player key={player.id} player={player} index={i} ref={modelRefs.current[player.id]} />
      ))}
    </group>
  );
};

export default React.memo(Game);
