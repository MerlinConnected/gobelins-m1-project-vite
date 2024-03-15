import React from 'react';

import { useGameStateContext } from '../../provider/GameStateProvider';

function Onboarding() {
  const { setRoomCode, handleInsertCoin } = useGameStateContext();

  return (
    <>
      <button
        onClick={() => {
          handleInsertCoin();
        }}
      >
        New room
      </button>
      <button
        onClick={() => {
          const roomCode = prompt('Enter room code');
          if (roomCode) {
            setRoomCode(roomCode);
            handleInsertCoin();
          }
        }}
      >
        Join room
      </button>
    </>
  );
}

export default React.memo(Onboarding);
