import React from 'react';

import { useGameStateContext } from './provider/GameStateProvider';

import { GAME_PHASE } from './utils/constants';

import styles from './App.module.scss';

import Onboarding from './blocks/onboarding/Onboarding';
import InfoLobby from './blocks/info-lobby/InfoLobby';
import Lobby from './blocks/lobby/Lobby';
import Game from './blocks/game/Game';
import UI from './blocks/ui/UI';
import Results from './blocks/results/Results';
import { useEffect } from 'react';
import AudioManager from './blocks/audio-manager/AudioManager';
import { AnimatePresence } from 'framer-motion';
import Intro from './blocks/intro/Intro';

function Scene() {
  const { onboarding, infoLobby, lobby, globalPhase } = useGameStateContext();

  return (
    <>
      {globalPhase === GAME_PHASE.lobby && (
        <div className={styles.wrapper}>
          {globalPhase === GAME_PHASE.lobby && onboarding && <Onboarding />}
          {globalPhase === GAME_PHASE.lobby && infoLobby && <InfoLobby />}
          {globalPhase === GAME_PHASE.lobby && lobby && <Lobby />}
        </div>
      )}

      {globalPhase === GAME_PHASE.lobby && !onboarding && <AudioManager musicPhase={'home'} />}
      {globalPhase === GAME_PHASE.playGame && <AudioManager musicPhase={'game'} />}
      {globalPhase !== GAME_PHASE.lobby && <Game />}
      {globalPhase === GAME_PHASE.startGame || (globalPhase === GAME_PHASE.playGame && <UI />)}
      <AnimatePresence>{globalPhase === GAME_PHASE.startGame && <Intro />}</AnimatePresence>

      {globalPhase === GAME_PHASE.endGame && <Results />}
    </>
  );
}

export default React.memo(Scene);
