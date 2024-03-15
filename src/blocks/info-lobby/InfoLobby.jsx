import React from 'react';

import { useGameStateContext } from '../../provider/GameStateProvider';

function InfoLobby() {
  const { handleInsertCoin } = useGameStateContext();

  return (
    <button
      onClick={() => {
        handleInsertCoin();
      }}
    >
      continue to lobby
    </button>
  );
}

export default React.memo(InfoLobby);
