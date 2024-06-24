import React, { useState } from 'react';

import { useMultiplayerState, usePlayersList, getState } from 'playroomkit';
import { randInt } from 'three/src/math/MathUtils';
import { transportDrawer, actionDrawer, piedTransportCard, MAX_POINTS, TIME_RESULT } from '../utils/constants';
import { isHost } from 'playroomkit';

let context = {};
const PlayerContext = React.createContext(context);

export function PlayerProvider({ children }) {
  const [nameEditing, setNameEditing] = useState(false);
  const [turnNumber, setTurnNumber] = useState(1);
  const [playerTimeouts, setPlayerTimeouts] = useState([]);
  const [playerTurn, setPlayerTurn] = useMultiplayerState('playerTurn', 0);

  const players = usePlayersList(true);
  players.sort((a, b) => a.getState('joinedAt') - b.getState('joinedAt'));
  const inGamePlayers = players.filter((player) => player.getState('qualified') === false);

  const gameState = {
    nameEditing,
    setNameEditing,
    playerTurn,
    setPlayerTurn,
    players,
    inGamePlayers,
  };

  const drawCard = (type) => {
    const uuid = Math.random().toString(36).substr(2, 9);

    // Add unique id
    if (type === 'transport') {
      const randomTransportIndex = randInt(0, transportDrawer.length - 1);
      return {
        uuid,
        ...transportDrawer[randomTransportIndex],
      };
    }
    if (type === 'action') {
      const randomActionIndex = randInt(0, actionDrawer.length - 1);
      return {
        uuid,
        ...actionDrawer[randomActionIndex],
      };
    }
  };

  const distributeCard = (type, player) => {
    const cards = player.getState('cards');
    const newCard = drawCard(type);
    cards.push(newCard);
    player.setState('cards', cards, true);
  };

  const removeCardsAuto = (player) => {
    const autoDeck = player.getState('cards').slice(0, 2);
    player.setState('cards', autoDeck, true);
  };

  const setBlockedPlayers = () => {
    const event = getState('event');

    if (event) {
      inGamePlayers.forEach((player) => {
        const playerCategories = player.getState('status').category;
        if (playerCategories.includes(event.card.category)) {
          player.setState('blocked', true, true);
        } else {
          player.setState('blocked', false, true);
        }
      });
    } else {
      inGamePlayers.forEach((player) => {
        player.setState('blocked', false, true);
      });
    }
  };

  const handleEndOfPlayTurn = () => {
    const currentPlayer = players[playerTurn];

    if (currentPlayer.getState('cards').length > 2) {
      removeCardsAuto(currentPlayer);
    }
  };

  const performPlayerAction = () => {
    if (!isHost()) return;

    const currentPlayer = players[playerTurn];

    // set status
    const target = currentPlayer.getState('target');
    const selectedCard = currentPlayer.getState('selectedCard');
    const availableTargets = currentPlayer.getState('availableTargets');
    const isATarget = availableTargets.some((availableTarget) => availableTarget?.id === target?.id);

    if (!isATarget) return;
    const targetPlayer = players.find((player) => player.id === target.id);

    if (targetPlayer && selectedCard) {
      switch (selectedCard.type) {
        case 'transport':
          if (targetPlayer.id === currentPlayer.id) {
            currentPlayer.setState('status', selectedCard, true);
          }
          break;

        case 'action':
          targetPlayer.setState('flashGekko', true, true);

          if (selectedCard.name === 'pied') {
            targetPlayer.setState('status', piedTransportCard, true);
          } else if (selectedCard.name === 'moins1' || selectedCard.name === 'moins2') {
            targetPlayer.setState('minus', targetPlayer.getState('minus') + selectedCard.impact, true);
          }
          break;
        default:
          break;
      }
    }

    setBlockedPlayers();
  };

  // verifier toutes les conditions de chaque player et faire les avancées en fonction de l'état de chaque player
  const move = () => {
    playerTimeouts.forEach((timeout) => clearTimeout(timeout));
    setPlayerTimeouts([]);

    const newTimeouts = [];

    for (let i = playerTurn; i < inGamePlayers.length + playerTurn; i++) {
      const index = i % inGamePlayers.length;
      const p = inGamePlayers[index];

      const timeout = setTimeout(() => {
        if (p.getState('minus') !== 0) {
          const tempPoints =
            p.getState('points') + p.getState('minus') > 0 ? p.getState('points') + p.getState('minus') : 0;
          p.setState('points', tempPoints, true);
          p.setState('minus', 0, true);
        } else {
          if (!p.getState('blocked')) {
            const statusPoints = p.getState('status').impact;
            p.setState('points', p.getState('points') + statusPoints, true);
          }
        }
        if (p.getState('points') >= MAX_POINTS) {
          p.setState('winner', 10 * turnNumber + i, true);
        }
      }, 1000 * i);

      newTimeouts.push(timeout);
    }

    setPlayerTimeouts(newTimeouts);

    setTurnNumber(turnNumber + 1);
  };

  const useScoreboard = players
    .map((player) => {
      return {
        name: player.getState('name'),
        points: player.getState('points'),
      };
    })
    .sort((a, b) => b.points - a.points);

  context = {
    ...gameState,
    drawCard,
    distributeCard,
    performPlayerAction,
    move,
    useScoreboard,
    setBlockedPlayers,
    handleEndOfPlayTurn,
  };

  return <PlayerContext.Provider value={context}>{children}</PlayerContext.Provider>;
}

export function usePlayerContext() {
  const context = React.useContext(PlayerContext);
  if (!context) throw new Error('usePlayerEngine must be used within a PlayerEngineProvider');
  return context;
}
