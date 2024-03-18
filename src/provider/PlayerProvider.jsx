import React, { useState } from 'react';

import { useMultiplayerState, usePlayersList, getState } from 'playroomkit';
import { randInt } from 'three/src/math/MathUtils';
import { transportDrawer, actionDrawer } from '../utils/constants';

let context = {};
const PlayerContext = React.createContext(context);

export function PlayerProvider({ children }) {
  const [nameEditing, setNameEditing] = useState(false);
  const [playerTurn, setPlayerTurn] = useMultiplayerState('playerTurn', 0);

  const players = usePlayersList(true);
  players.sort((a, b) => a.id.localeCompare(b.id));

  const gameState = {
    nameEditing,
    setNameEditing,
    playerTurn,
    setPlayerTurn,
    players,
  };

  const distributeCard = (type) => {
    const randomTransportIndex = randInt(0, transportDrawer.length - 1);

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

  context = {
    ...gameState,
    distributeCard,
    performPlayerAction,
  };

  return <PlayerContext.Provider value={context}>{children}</PlayerContext.Provider>;
}

export function usePlayerContext() {
  const context = React.useContext(PlayerContext);
  if (!context) throw new Error('usePlayerEngine must be used within a PlayerEngineProvider');
  return context;
}
