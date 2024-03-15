import React from 'react';

import { useMultiplayerState, usePlayersList, getState } from 'playroomkit';
import { randInt } from 'three/src/math/MathUtils';
import { transportDrawer, actionDrawer } from '../utils/constants';

let context = {};
const PlayerContext = React.createContext(context);

export function PlayerProvider({ children }) {
  const [playerTurn, setPlayerTurn] = useMultiplayerState('playerTurn', 0);

  const players = usePlayersList(true);
  players.sort((a, b) => a.id.localeCompare(b.id));

  const gameState = {
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
    const selectedCard = currentPlayer.getState('selectedCard');
    const cards = currentPlayer.getState('cards');

    switch (selectedCard.type) {
      case 'transport':
        let selfTarget = currentPlayer.getState('target');
        if (selfTarget !== null && selfTarget !== undefined) {
          currentPlayer.setState('points', currentPlayer.getState('points') + 1, true);
        }
        break;
      case 'action':
        const availableTargets = players.filter((p) => p.id !== currentPlayer.id); // todo: essayer de remplacer par 'availableTargets' à récupérer dans le state du currentPlayer
        let target = currentPlayer.getState('target');
        if (target !== null && target !== undefined) {
          let targetPlayer = availableTargets.find((p) => p.id === target.id);
          targetPlayer.setState('points', targetPlayer.getState('points') - 1, true);
        }
        break;
      default:
        break;
    }

    currentPlayer.setState('cards', cards, true);
    currentPlayer.setState('selectedCard', '', true);
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
