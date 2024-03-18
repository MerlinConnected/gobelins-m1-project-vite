import React from 'react';

import { useGameStateContext } from './provider/GameStateProvider';

import { GAME_PHASE } from './utils/constants';

import Onboarding from './blocks/onboarding/Onboarding';
import InfoLobby from './blocks/info-lobby/InfoLobby';
import Lobby from './blocks/lobby/Lobby';
import Game from './blocks/game/Game';
import UI from './blocks/ui/UI';

function Scene() {
  const { onboarding, infoLobby, lobby, globalPhase } = useGameStateContext();

  return (
    <>
      {onboarding && <Onboarding />}
      {infoLobby && <InfoLobby />}
      {lobby && <Lobby />}
      {globalPhase === GAME_PHASE.startGame && <Game />}
      {globalPhase === GAME_PHASE.startGame && <UI />}
    </>
  );
}

export default React.memo(Scene);
