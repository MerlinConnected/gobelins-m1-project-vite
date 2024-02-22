import React from 'react';

import { useMultiplayerState, usePlayersList, onPlayerJoin, isHost, getState } from 'playroomkit';
import { useEffect } from 'react';
import { randInt } from 'three/src/math/MathUtils';
import { useControls } from 'leva';
import { useRef } from 'react';

const DaronEngineContext = React.createContext();

//
const TIME_PLAYER_TURN = 5;
const MAX_POINTS = 10;
const TIME_END_TURN = 2;

export function DaronEngineProvider({ children }) {
  const [timer, setTimer] = useMultiplayerState('timer', 0);
  const [phase, setPhase] = useMultiplayerState('phase', 'lobby');
  const [playerTurn, setPlayerTurn] = useMultiplayerState('playerTurn', 0);
  const [points, setPoints] = useMultiplayerState('points', 0);

  const players = usePlayersList(true);
  players.sort((a, b) => a.id.localeCompare(b.id));

  const gameState = {
    timer,
    phase,
    playerTurn,
    players,
    points,
  };

  const startGame = () => {
    if (isHost()) {
      console.log('startGame');
      setTimer(TIME_PLAYER_TURN, true);

      console.log('gfkjehgalkhzrejl');
      const randomValue = 1;
      setPlayerTurn(randomValue, true);

      players.forEach((player) => {
        player.setState('points', 0, true);
      });
      setPhase('playerTurn', true);
    }
  };

  useEffect(() => {
    startGame();
    onPlayerJoin(startGame);
  }, []);

  const phaseEnd = () => {
    let newTime = 0;
    switch (getState('phase')) {
      case 'playerTurn':
        setPhase('endTurn', true);
        newTime = TIME_END_TURN;
        break;
      case 'endTurn':
        console.log('Next player');
        const newPlayerTurn = (getState('playerTurn') + 1) % players.length;
        setPlayerTurn(newPlayerTurn, true);
        setPhase('playerTurn', true);
        newTime = TIME_PLAYER_TURN;
        break;
    }
    setTimer(newTime, true);
  };

  const { paused } = useControls({
    paused: false,
  });

  const timerInterval = useRef();

  const runTimer = () => {
    timerInterval.current = setInterval(() => {
      if (!isHost()) return;
      if (paused) return;
      let newTime = getState('timer') - 1;
      console.log('newTime', newTime);

      if (newTime <= 0) {
        phaseEnd();
      } else {
        setTimer(newTime, true);
      }
    }, 1000);
  };

  const clearTimer = () => {
    clearInterval(timerInterval.current);
  };

  useEffect(() => {
    runTimer();
    return clearTimer;
  }, [phase, paused]);

  return <DaronEngineContext.Provider value={{ ...gameState, startGame }}>{children}</DaronEngineContext.Provider>;
}

export function useDaronEngine() {
  const context = React.useContext(DaronEngineContext);

  if (!context) {
    throw new Error('useDaronEngine must be used within a DaronEngineProvider');
  }
  return context;
}
