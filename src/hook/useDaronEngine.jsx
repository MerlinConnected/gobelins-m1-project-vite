import React from 'react';

import { useMultiplayerState, usePlayersList, onPlayerJoin, isHost, getState } from 'playroomkit';
import { useEffect } from 'react';
import { randInt } from 'three/src/math/MathUtils';
import { useControls } from 'leva';
import { useRef } from 'react';

const DaronEngineContext = React.createContext();

//
const TIME_PLAYER_ACTION = 10;

export function DaronEngineProvider({ children }) {
  const [playerTimer, setPlayerTimer] = useMultiplayerState('playerTimer', 0);
  const [phase, setPhase] = useMultiplayerState('phase', 'lobby');
  const [playerTurn, setPlayerTurn] = useMultiplayerState('playerTurn', 0);

  const players = usePlayersList();
  players.sort((a, b) => a.id.localeCompare(b.id));

  const gameState = {
    playerTimer,
    phase,
    playerTurn,
    players,
  };

  const startGame = () => {
    if (isHost()) {
      console.log('startGame');
      setPlayerTimer(TIME_PLAYER_ACTION, true);
      // const randomPlayer = randInt(0, players.length - 1);
      const randomPlayer = 0;
      setPlayerTurn(randomPlayer, true);
      setPhase('game', true);
    }
  };

  useEffect(() => {
    startGame();
    onPlayerJoin(startGame);
  }, []);

  const { paused } = useControls({
    paused: false,
  });

  const timerInterval = useRef();

  const runTimer = () => {
    timerInterval.current = setInterval(() => {
      if (!isHost()) return;
      if (paused) return;
      let newTime = getState('playerTimer') - 1;
      console.log('newTime', newTime);

      if (newTime <= 0) {
        phaseEnd();
      } else {
        setPlayerTimer(newTime, true);
      }
    }, 1000);
  };

  const clearTimer = () => {
    clearInterval(timerInterval.current);
  };

  useEffect(() => {
    console.log('phase', phase, paused);
    runTimer();
    return clearTimer();
  }, [phase, paused]);

  return <DaronEngineContext.Provider value={{ ...gameState }}>{children}</DaronEngineContext.Provider>;
}

export function useDaronEngine() {
  const context = React.useContext(DaronEngineContext);

  if (!context) {
    throw new Error('useDaronEngine must be used within a DaronEngineProvider');
  }
  return context;
}
