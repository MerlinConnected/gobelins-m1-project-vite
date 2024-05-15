import React from 'react';

import { useGameStateContext } from './provider/GameStateProvider';

import { GAME_PHASE } from './utils/constants';

import Onboarding from './blocks/onboarding/Onboarding';
import InfoLobby from './blocks/info-lobby/InfoLobby';
import Lobby from './blocks/lobby/Lobby';
import Game from './blocks/game/Game';
import UI from './blocks/ui/UI';
import Results from './blocks/results/Results';
import { useEffect } from 'react';

function Scene() {
  const { onboarding, infoLobby, lobby, globalPhase } = useGameStateContext();

  return (
    <>
      {globalPhase === GAME_PHASE.lobby && onboarding && <Onboarding />}
      {globalPhase === GAME_PHASE.lobby && infoLobby && <InfoLobby />}
      {globalPhase === GAME_PHASE.lobby && lobby && <Lobby />}
      {globalPhase !== GAME_PHASE.lobby && <Game />}
      {globalPhase === GAME_PHASE.startGame && <UI />}
      {globalPhase === GAME_PHASE.endGame && <Results />}
    </>
  );
}

export default React.memo(Scene);
