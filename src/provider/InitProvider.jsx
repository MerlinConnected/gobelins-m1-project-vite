import React, { createContext, useState, useContext, useEffect, useMemo, PropsWithChildren } from 'react';

import { isHost } from 'playroomkit';
import { usePlayerContext } from './PlayerProvider';
import { useGameStateContext } from './GameStateProvider';

import {
  GLOBAL_PHASE,
  TIME_START_GAME,
  TIME_START_TURN,
  TURN_PHASE,
} from '../utils/constants';

let context = {};
export const InitContext = createContext();

export function InitProvider({ children }) {
  const { globalPhase, setTurnPhase, setTimer } = useGameStateContext();
  const { players, setPlayerTurn, distributeCard } = usePlayerContext();

  const startGame = () => {
    if (isHost()) {
      setTimer(TIME_START_GAME, true);
      const randomValue = 1;
      setPlayerTurn(randomValue, true);

      players.forEach((player) => {
        player.setState('points', 0, true);
        player.setState('cards', [], true);
        player.setState('selectedCardType', '', true);
        player.setState('selectedCardId', '', true);
        player.setState('target', null, true);
        player.setState('availableTargets', [], true);
        player.setState('winner', false, true);
      });

      distributeCard('initial');
      setTurnPhase(TURN_PHASE.startTurn, true);
      setTimer(TIME_START_TURN, true);
    }
  };

  useEffect(() => {
    if (globalPhase === GLOBAL_PHASE.startGame) startGame();
  }, [globalPhase]);

  context = {
    ...initState,
  };

  return <InitContext.Provider value={context}>{children}</InitContext.Provider>;
}

export function useInitContext() {
  const context = useContext(InitContext);
  if (!context) throw Error('useInitContext must be used inside a `InitProvider`');
  return context;
}
