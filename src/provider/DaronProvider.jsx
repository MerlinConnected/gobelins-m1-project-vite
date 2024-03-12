import React from 'react';

import { useMultiplayerState, usePlayersList, onPlayerJoin, isHost, getState } from 'playroomkit';
import { useEffect } from 'react';
import { randInt } from 'three/src/math/MathUtils';
import { useControls } from 'leva';
import { useRef } from 'react';

let context = {};
const DaronContext = React.createContext(context);

const TIME_START_GAME = 1;
const TIME_START_TURN = 1;
const TIME_PLAYER_TURN = 6;
const TIME_END_TURN = 1;
const AMOUNT_TRANSPORT_CARDS = 10;
const AMOUNT_ACTION_CARDS = 1;
const MAX_POINTS = 10;

export function DaronProvider({ children }) {
  // GLOBAL STATE (for everyone)
  const [timer, setTimer] = useMultiplayerState('timer', 0);
  const [maxPoints, setMaxPoints] = useMultiplayerState('maxPoints', 0);
  const [phase, setPhase] = useMultiplayerState('phase', 'lobby');
  const [playerPhase, setPlayerPhase] = useMultiplayerState('playerPhase', '');
  const [playerTurn, setPlayerTurn] = useMultiplayerState('playerTurn', 0);
  const [transportDrawer, setTransportDrawer] = useMultiplayerState('transportDrawer', []);
  const [actionDrawer, setActionDrawer] = useMultiplayerState('actionDrawer', []);

  const players = usePlayersList(true);
  players.sort((a, b) => a.id.localeCompare(b.id));

  const gameState = {
    timer,
    phase,
    playerPhase,
    setPlayerPhase,
    playerTurn,
    players,
  };

  const distributeCard = (type) => {
    const transportDrawer = [...getState('transportDrawer')];
    const randomTransportIndex = randInt(0, transportDrawer.length - 1);

    const actionDrawer = [...getState('actionDrawer')];
    const randomActionIndex = randInt(0, actionDrawer.length - 1);

    const currentPlayer = players[playerTurn];
    const cards = currentPlayer.getState('cards');

    switch (type) {
      case 'transport':
        cards.push(transportDrawer[randomTransportIndex]);
        currentPlayer.setState('cards', cards, true);
        break;

      case 'action':
        cards.push(actionDrawer[randomActionIndex]);
        currentPlayer.setState('cards', cards, true);
        break;

      case 'initial':
        players.forEach((player) => {
          const cards = player.getState('cards') || [];
          const randomTransportIndex = randInt(0, transportDrawer.length - 1);
          cards.push(transportDrawer[randomTransportIndex]);
          const randomActionIndex = randInt(0, actionDrawer.length - 1);
          cards.push(actionDrawer[randomActionIndex]);

          player.setState('cards', cards, true);
        });

      default:
        break;
    }
  };

  const startGame = () => {
    if (isHost()) {
      setPhase('startGame', true);
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

      setPhase('startTurn', true);
      setTimer(TIME_START_TURN, true);
      console.log('Animation de début de partie');
    }
  };

  useEffect(() => {
    startGame();
    onPlayerJoin(startGame);
  }, []);

  const performPlayerAction = () => {
    const currentPlayer = players[playerTurn];
    const selectedCardType = currentPlayer.getState('selectedCardType');
    const selectedCardId = currentPlayer.getState('selectedCardId');
    const cards = currentPlayer.getState('cards');

    switch (selectedCardType) {
      case 'transport':
        currentPlayer.setState('availableTargets', [currentPlayer], true);
        currentPlayer.setState('points', currentPlayer.getState('points') + 1, true);
        break;
      case 'action':
        const availableTargets = players.filter((p) => p.id !== currentPlayer.id);
        currentPlayer.setState('availableTargets', availableTargets, true);
        let targetIndex = currentPlayer.getState('target');
        if (targetIndex !== null && targetIndex !== undefined) {
          let target = availableTargets[targetIndex];
          target.setState('points', target.getState('points') - 1, true);
        }
        break;
      default:
        break;
    }
    if (currentPlayer.getState('selectedCardId') !== '') {
      cards.splice(
        cards.findIndex((card) => card.id === selectedCardId),
        1
      );
      console.log('REMOVED', selectedCardId);
    }
    currentPlayer.setState('cards', cards, true);
    currentPlayer.setState('selectedCardType', '', true);
    currentPlayer.setState('selectedCardId', '', true);
    currentPlayer.setState('target', null, true);
    currentPlayer.setState('availableTargets', [], true);
  };

  // manage timers & phases when timer is ending
  const phaseEnd = () => {
    let newTime = 0;
    switch (getState('phase')) {
      case 'startTurn':
        // "performRandomEvent()"
        const newPlayerTurn = (getState('playerTurn') + 1) % players.length;
        setPlayerTurn(newPlayerTurn, true);
        setPhase('playerTurn', true);
        setPlayerPhase('drawCards', true);
        newTime = TIME_PLAYER_TURN;
        break;
      case 'playerTurn':
        performPlayerAction();
        setPhase('endTurn', true);
        newTime = TIME_END_TURN;
        setPlayerPhase('firstResult', true);
        break;
      case 'endTurn':
        setPhase('startTurn', true);
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
    console.log('phase', phase);
    runTimer();
    return clearTimer;
  }, [phase, paused]);

  context = {
    ...gameState,
    startGame,
    distributeCard,
  };

  return <DaronContext.Provider value={context}>{children}</DaronContext.Provider>;
}

export function useDaronContext() {
  const context = React.useContext(DaronContext);
  if (!context) throw new Error('useDaronEngine must be used within a DaronEngineProvider');
  return context;
}
