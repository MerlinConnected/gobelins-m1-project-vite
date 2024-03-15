import React from 'react';

import { useGameStateContext } from '../../provider/GameStateProvider';
import { GAME_PHASE } from '../../utils/constants';
import { insertCoin } from 'playroomkit';

function Onboarding() {
  const { setOnboarding, setInfoLobby, setRoomCode } = useGameStateContext();

  const goToInfoLobby = () => {
    setOnboarding(false);
    setInfoLobby(true);
  };

  return (
    <>
      <button onClick={() => goToInfoLobby()}>New room</button>
      <button
        onClick={() => {
          const roomCode = prompt('Enter room code');
          if (roomCode) {
            setRoomCode(roomCode);
            goToInfoLobby();
          }
        }}
      >
        Join room
      </button>
    </>
  );
}

export default React.memo(Onboarding);
