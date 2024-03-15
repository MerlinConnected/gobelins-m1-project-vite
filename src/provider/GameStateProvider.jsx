import React, { useEffect, useRef } from 'react';

import { useMultiplayerState, getState, isHost, insertCoin } from 'playroomkit';
import { useControls } from 'leva';
import { usePlayerContext } from './PlayerProvider';

import { TURN_PHASE, PLAYER_PHASE, TIME_START_TURN, TIME_PLAYER_TURN, TIME_END_TURN } from '../utils/constants';
import { useState } from 'react';

let context = {};
const GameStateContext = React.createContext();

export function GameStateProvider({ children }) {
  const { setPlayerTurn, performPlayerAction, players } = usePlayerContext();

  const [roomCode, setRoomCode] = useState('');
  const [onboarding, setOnboarding] = useState(true);
  const [infoLobby, setInfoLobby] = useState(false);
  const [lobby, setLobby] = useState(false);

  const [timer, setTimer] = useMultiplayerState('timer', 0);
  const [globalPhase, setGlobalPhase] = useMultiplayerState('globalPhase', null);
  const [turnPhase, setTurnPhase] = useMultiplayerState('turnPhase', null);
  const [playerPhase, setPlayerPhase] = useMultiplayerState('playerPhase', null);

  function handleInsertCoin() {
    insertCoin({
      skipLobby: true,
      roomCode: roomCode,
    }).then(() => {
      setOnboarding(false);
      setInfoLobby(true);
    });
  }

  const gameState = {
    roomCode,
    setRoomCode,
    onboarding,
    setOnboarding,
    infoLobby,
    setInfoLobby,
    lobby,
    setLobby,
    timer,
    setTimer,
    globalPhase,
    setGlobalPhase,
    turnPhase,
    setTurnPhase,
    playerPhase,
    setPlayerPhase,
    handleInsertCoin,
  };

  const phaseEnd = () => {
    let newTime = 0;
    switch (getState('turnPhase')) {
      case TURN_PHASE.startTurn:
        const newPlayerTurn = (getState('playerTurn') + 1) % players.length;
        setPlayerTurn(newPlayerTurn, true);
        setTurnPhase(TURN_PHASE.playTurn, true);
        setPlayerPhase(PLAYER_PHASE.drawCards, true);
        newTime = TIME_PLAYER_TURN;
        break;
      case TURN_PHASE.playTurn:
        performPlayerAction();
        setTurnPhase(TURN_PHASE.endTurn, true);
        setPlayerPhase(PLAYER_PHASE.firstResult, true);
        newTime = TIME_END_TURN;
        break;
      case TURN_PHASE.endTurn:
        setTurnPhase(TURN_PHASE.startTurn, true);
        newTime = TIME_START_TURN;
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

  // is fired when phase or paused changes
  useEffect(() => {
    console.log('phase', turnPhase);
    runTimer();
    return clearTimer;
  }, [turnPhase, paused]);

  context = {
    ...gameState,
  };

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
}

export function useGameStateContext() {
  const context = React.useContext(GameStateContext);
  if (!context) throw new Error('useGameStateContext must be used within a GameStateProvider');
  return context;
}
