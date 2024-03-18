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

    const decisions = currentPlayer.getState('decisions');

    let isSameTarget = false;

    if (currentPlayer.getState('decisions').length > 1) {
      isSameTarget = decisions.slice(1).every((obj, index) => {
        return obj.target.id === decisions[0].target.id;
      });
    }

    if (isSameTarget) {
      currentPlayer.setState('decisions', currentPlayer.getState('decisions').slice(1), true);
    }

    // boucle pour 2 cartes
    for (let i = 0; i < currentPlayer.getState('decisions').length; i++) {
      const decision = currentPlayer.getState('decisions')[i];
      let target = decision.target;
      switch (decision.type) {
        case 'transport':
          if (target.id == currentPlayer.id) {
            currentPlayer.setState('points', currentPlayer.getState('points') + decision.impact, true);
          }
          break;
        case 'action':
          const availableTargets = players.filter((p) => p.id !== currentPlayer.id); // todo: essayer de remplacer par 'availableTargets' à récupérer dans le state du currentPlayer
          if (target !== null && target !== undefined) {
            let targetPlayer = availableTargets.find((p) => p.id === target.id);
            targetPlayer.setState('points', targetPlayer.getState('points') + decision.impact, true);
          }
          break;
        default:
          break;
      }
    }

    currentPlayer.setState('selectedCard', '', true);
    currentPlayer.setState('target', null, true);
    currentPlayer.setState('availableTargets', [], true);
    currentPlayer.setState('decisions', [], true);
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
