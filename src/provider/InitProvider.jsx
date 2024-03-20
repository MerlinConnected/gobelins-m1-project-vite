import React, { createContext, useState, useContext, useEffect, useMemo, PropsWithChildren } from 'react';

import { isHost } from 'playroomkit';
import { usePlayerContext } from './PlayerProvider';
import { useGameStateContext } from './GameStateProvider';

import { GAME_PHASE, TIME_START_GAME, TIME_START_TURN, TURN_PHASE } from '../utils/constants';

let context = {};
export const InitContext = createContext();

export function InitProvider({ children }) {
  const { globalPhase, setTurnPhase, setTimer } = useGameStateContext();
  const { players, setPlayerTurn, drawCard, distributeCard } = usePlayerContext();

  const startGame = () => {
    if (isHost()) {
      setTimer(TIME_START_GAME, true);
      const randomValue = 1;
      setPlayerTurn(randomValue, true);

      players.forEach((player) => {
        player.setState('points', 0, true);
        player.setState('cards', [], true);
        player.setState('selectedCard', null, true);
        player.setState('target', null, true);
        player.setState('availableTargets', [], true);
        player.setState('decisions', [], true);
        player.setState('minus', 0, true);
        distributeCard('transport', player);
        distributeCard('action', player);
        const statusCard = drawCard('transport');
        player.setState('status', statusCard, true);
      });

      setTurnPhase(TURN_PHASE.startTurn, true);
      setTimer(TIME_START_TURN, true);
    }
  };

  useEffect(() => {
    if (globalPhase === GAME_PHASE.startGame) startGame();
  }, [globalPhase]);

  context = {};

  return <InitContext.Provider value={context}>{children}</InitContext.Provider>;
}

export function useInitContext() {
  const context = useContext(InitContext);
  if (!context) throw Error('useInitContext must be used inside a `InitProvider`');
  return context;
}
