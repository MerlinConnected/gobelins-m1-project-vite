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
  const [maxPoints, setMaxPoints] = useMultiplayerState('maxPoints', 0);
  const [phase, setPhase] = useMultiplayerState('phase', 'lobby');
  const [playerTurn, setPlayerTurn] = useMultiplayerState('playerTurn', 0);

  const players = usePlayersList(true);
  players.sort((a, b) => a.id.localeCompare(b.id));

  const gameState = {
    timer,
    phase,
    playerTurn,
    players,
  };

  const startGame = () => {
    if (isHost()) {
      setTimer(TIME_PLAYER_TURN, true);
      const randomValue = 1;
      setPlayerTurn(randomValue, true);
      setMaxPoints(MAX_POINTS, true);

      players.forEach((player) => {
        player.setState('points', 0, true);
        player.setState("selectedCard", '', true);
        player.setState('target', null, true);
        player.setState('availableTargets', [], true);
      });
      setPhase('playerTurn', true);
    }
  };

  useEffect(() => {
    startGame();
    onPlayerJoin(startGame);
  }, []);

  const performPlayerAction = () => {
    const currentPlayer = players[playerTurn];
    const selectedCard = currentPlayer.getState("selectedCard");

    switch (selectedCard) {
      case "transport":
        currentPlayer.setState('availableTargets', [currentPlayer], true);
        currentPlayer.setState("points", currentPlayer.getState("points") + 1, true);
        break;
      case "backwards":
        const availableTargets = players.filter((p) => p.id !== currentPlayer.id);
        currentPlayer.setState('availableTargets', availableTargets, true);
        let targetIndex = currentPlayer.getState("target");
        if (targetIndex !== null && targetIndex !== undefined) {
          let target = availableTargets[targetIndex];
          target.setState("points", target.getState("points") - 1, true);
        }
        break;
      default:
        break;
    }
    currentPlayer.setState("selectedCard", '', true);
    currentPlayer.setState('target', null, true);
    currentPlayer.setState('availableTargets', [], true);
  };

  const phaseEnd = () => {
    let newTime = 0;
    switch (getState('phase')) {
      case 'playerTurn':
        performPlayerAction();
        setPhase('endTurn', true);
        newTime = TIME_END_TURN;
        break;
      case 'endTurn':
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
      console.log(newTime);

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
