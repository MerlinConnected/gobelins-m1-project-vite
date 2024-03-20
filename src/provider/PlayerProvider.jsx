import React, { useState } from 'react';

import { useMultiplayerState, usePlayersList, getState } from 'playroomkit';
import { randInt } from 'three/src/math/MathUtils';
import { transportDrawer, actionDrawer, piedTransportCard } from '../utils/constants';

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

  const drawCard = (type) => {
    if (type === 'transport') {
      const randomTransportIndex = randInt(0, transportDrawer.length - 1);
      return transportDrawer[randomTransportIndex];
    }
    if (type === 'action') {
      const randomActionIndex = randInt(0, actionDrawer.length - 1);
      return actionDrawer[randomActionIndex];
    }
  }

  const distributeCard = (type, player) => {
    const cards = player.getState('cards');
    const newCard = drawCard(type);
    cards.push(newCard);
    player.setState('cards', cards, true);
  };

  const removeCardsAuto = (player) => {
    const autoDeck = player.getState('cards').slice(0, 2);
    player.setState('cards', autoDeck, true);
  }

  const performPlayerAction = () => {
    const currentPlayer = players[playerTurn];

    if (currentPlayer.getState('cards').length > 2) {
      removeCardsAuto(currentPlayer);
    }

    // set status
    for (let i = 0; i < currentPlayer.getState('decisions').length; i++) {
      const decision = currentPlayer.getState('decisions')[i];
      let target = decision.target;
      switch (decision.card.type) {
        case 'transport':
          if (target.id == currentPlayer.id) {
            currentPlayer.setState('status', decision.card, true);
          }
          break;
        case 'action':
          const availableTargets = players.filter((p) => p.id !== currentPlayer.id); // todo: essayer de remplacer par 'availableTargets' à récupérer dans le state du currentPlayer
          if (target !== null && target !== undefined) {
            let targetPlayer = availableTargets.find((p) => p.id === target.id);

            if (decision.card.name === 'pied') {
              targetPlayer.setState('status', piedTransportCard, true);
            } else {
              targetPlayer.setState('minus', targetPlayer.getState('minus') + decision.card.impact, true);
            }
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

  // verifier toutes les conditions de chaque player et faire les avancées en fonction de l'état de chaque player
  const move = () => {
    players.forEach((p) => {
      if (p.getState('minus') !== 0) {
        const tempPoints = p.getState('points') + p.getState('minus') > 0 ? p.getState('points') + p.getState('minus') : 0;
        p.setState('points', tempPoints, true);
        p.setState('minus', 0, true);
      } else {
        const statusPoints = p.getState('status').impact;
        console.log('STATUS POINTS' + statusPoints);
        p.setState('points', p.getState('points') + statusPoints, true);
      }
    });
  }

  context = {
    ...gameState,
    drawCard,
    distributeCard,
    performPlayerAction,
    move,
  };

  return <PlayerContext.Provider value={context}>{children}</PlayerContext.Provider>;
}

export function usePlayerContext() {
  const context = React.useContext(PlayerContext);
  if (!context) throw new Error('usePlayerEngine must be used within a PlayerEngineProvider');
  return context;
}
