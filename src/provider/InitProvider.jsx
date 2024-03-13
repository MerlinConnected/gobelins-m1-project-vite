import React, { createContext, useState, useContext, useEffect, useMemo, PropsWithChildren } from 'react';

import { useMultiplayerState, isHost } from 'playroomkit';
import { usePlayerContext } from './PlayerProvider';
import { useGameStateContext } from './GameStateProvider';

import {
  GLOBAL_PHASE,
  TIME_START_GAME,
  TIME_START_TURN,
  TURN_PHASE,
  MAX_POINTS,
  AMOUNT_TRANSPORT_CARDS,
  AMOUNT_ACTION_CARDS,
} from '../utils/constants';

let context = {};
export const InitContext = createContext();

export function InitProvider({ children }) {
  const { globalPhase, setTurnPhase, setTimer } = useGameStateContext();
  const { players, setPlayerTurn, distributeCard } = usePlayerContext();

  const [maxPoints, setMaxPoints] = useMultiplayerState('maxPoints', 0);
  const [transportDrawer, setTransportDrawer] = useMultiplayerState('transportDrawer', []);
  const [actionDrawer, setActionDrawer] = useMultiplayerState('actionDrawer', []);

  const initState = {
    maxPoints,
    setMaxPoints,
    transportDrawer,
    setTransportDrawer,
    actionDrawer,
    setActionDrawer,
  };

  const startGame = () => {
    if (isHost()) {
      setTimer(TIME_START_GAME, true);
      const randomValue = 1;
      setPlayerTurn(randomValue, true);
      setMaxPoints(MAX_POINTS, true);
      setTransportDrawer(
        [
          ...new Array(AMOUNT_TRANSPORT_CARDS)
            .fill()
            .map((_, index) => ({ id: index, name: 'velo', type: 'transport' })),
          ...new Array(AMOUNT_TRANSPORT_CARDS)
            .fill()
            .map((_, index) => ({ id: index + AMOUNT_TRANSPORT_CARDS, name: 'voiture', type: 'transport' })),
          ...new Array(AMOUNT_TRANSPORT_CARDS)
            .fill()
            .map((_, index) => ({ id: index + 2 * AMOUNT_TRANSPORT_CARDS, name: 'moto', type: 'transport' })),
          ...new Array(AMOUNT_TRANSPORT_CARDS)
            .fill()
            .map((_, index) => ({ id: index + 3 * AMOUNT_TRANSPORT_CARDS, name: 'tramway', type: 'transport' })),
          ...new Array(AMOUNT_TRANSPORT_CARDS)
            .fill()
            .map((_, index) => ({ id: index + 4 * AMOUNT_TRANSPORT_CARDS, name: 'metro', type: 'transport' })),
        ],
        true
      );

      setActionDrawer(
        [
          ...new Array(AMOUNT_ACTION_CARDS).fill().map((_, index) => ({ id: index, name: 'moins', type: 'action' })),
          ...new Array(AMOUNT_ACTION_CARDS)
            .fill()
            .map((_, index) => ({ id: index + AMOUNT_ACTION_CARDS, name: 'pied', type: 'action' })),
        ],
        true
      );

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
