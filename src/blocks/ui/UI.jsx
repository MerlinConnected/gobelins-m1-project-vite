import React from 'react';
import { useEffect, useState } from 'react';

import { usePlayerContext } from '../../provider/PlayerProvider';
import { isHost, myPlayer } from 'playroomkit';
import { Leva, useControls } from 'leva';
import { getState } from 'playroomkit';

import classNames from 'classnames';
import Button from '../../components/button/Button';

import styles from './UI.module.scss';
import { useGameStateContext } from '../../provider/GameStateProvider';
import { PLAYER_PHASE } from '../../utils/constants';

function UI({ className, ...props }) {
  const { playerTurn, players, distributeCard } = usePlayerContext();
  const { playerPhase, setPlayerPhase, timer } = useGameStateContext();
  const [cardsDisabled, setCardsDisabled] = useState(true);
  const [drawersDisabled, setDrawersDisabled] = useState(true);

  const currentPlayer = players[playerTurn];
  const me = myPlayer();

  const selectCard = (card) => {
    console.log('selectCard');
    if (currentPlayer?.id !== me?.id) return;
    currentPlayer.setState('selectedCard', card, true);

    switch (card.type) {
      case 'action':
        currentPlayer.setState(
          'availableTargets',
          players.filter((p) => p.id !== currentPlayer.id),
          true
        );
        break;
      case 'transport':
        currentPlayer.setState(
          'availableTargets',
          [currentPlayer],
          true
        );
        break;
      default:
        break;
    }
  };

  const handleDrawer = (type) => {
    console.log('handleDrawer');
    if (currentPlayer?.id !== me?.id) return;
    if (currentPlayer?.getState('cards')?.length < 4) {
      distributeCard(type, currentPlayer);
    }

    if (currentPlayer?.getState('cards')?.length == 4) {
      setPlayerPhase('performFirst', true);
    }
  };

  const selectTarget = (player) => {
    console.log('selectTarget');
    currentPlayer.setState('target', player, true);
    const cards = currentPlayer.getState('cards');
    const selectedCard = currentPlayer.getState('selectedCard');
    const decisions = currentPlayer.getState('decisions');
    decisions.push({ card: selectedCard, target: player });
    currentPlayer.setState('decisions', decisions, true);

    // remove the selected card from the deck
    if (selectedCard) {
      cards.splice(
        cards.findIndex((card) => card.id === selectedCard.id),
        1
      );
      currentPlayer.setState('cards', cards, true);
    }

    // change playerPhase
    switch (playerPhase) {
      case PLAYER_PHASE.performFirst:
        setPlayerPhase(PLAYER_PHASE.firstResult, true);
        break;

      case PLAYER_PHASE.performLast:
        setPlayerPhase(PLAYER_PHASE.lastResult, true);
        break;

      default:
        break;
    }
  };

  // manage disabled states according to the playerPhase
  useEffect(() => {
    switch (playerPhase) {
      case PLAYER_PHASE.drawCards:
        if (currentPlayer?.id === me?.id && currentPlayer?.getState('cards')?.length < 4) {
          setCardsDisabled(true);
          setDrawersDisabled(false);
          console.log('PIOCHE, ' + currentPlayer.state.profile.name);
        }
        break;

      case PLAYER_PHASE.performFirst:
        if (currentPlayer?.id === me?.id) {
          setCardsDisabled(false);
          setDrawersDisabled(true);
          console.log('1) A TOI DE JOUER ' + currentPlayer.state.profile.name);
        }
        break;

      case PLAYER_PHASE.firstResult:
        console.log('Le joueur ' + currentPlayer.state.profile.name + ' a joué sa 1ère action ' + currentPlayer.getState('selectedCard').type + ' ' + currentPlayer.getState('selectedCard').name + ' sur le joueur ' + currentPlayer.getState('target').state.profile.name);
        setCardsDisabled(true);
        setDrawersDisabled(true);
        setTimeout(() => {
          setPlayerPhase(PLAYER_PHASE.performLast, true);
        }, 1000);
        break;

      case PLAYER_PHASE.performLast:
        if (currentPlayer?.id === me?.id) {
          setCardsDisabled(false);
          setDrawersDisabled(true);
          console.log('2) REJOUE ' + currentPlayer.state.profile.name);
        }
        break;

      case PLAYER_PHASE.lastResult:
        console.log('Le joueur ' + currentPlayer.state.profile.name + ' a joué sa 2ème action ' + currentPlayer.getState('selectedCard').type + ' ' + currentPlayer.getState('selectedCard').name + ' sur le joueur ' + currentPlayer.getState('target').state.profile.name);
        setCardsDisabled(true);
        setDrawersDisabled(true);
        setTimeout(() => {
          setPlayerPhase(null, true);
          currentPlayer.setState('selectedCard', null, true);
          currentPlayer.setState('target', null, true);
          currentPlayer.setState('availableTargets', [], true);
        }, 1000);
        break;

      case null:
        setCardsDisabled(true);
        setDrawersDisabled(true);

      default:
        setCardsDisabled(true);
        setDrawersDisabled(true);
    }

    console.log('playerPhase', playerPhase);
  }, [getState('playerPhase')]);

  return (
    <>
      <div className={classNames(styles.wrapper, className)} {...props}>
        {currentPlayer?.id === me?.id && <p>C'est mon tour !! {timer}</p>}
        <p>Je suis {me?.state.profile.name}</p>
        <div className="styles.board">
          <h2>Classement</h2>
          {players.map((player, index) => (
            <div key={index}>
              <p>{player.state.profile.name}</p>
              <p>{player.getState('status')?.name}</p>
              <p>{player.getState('points')} points</p>
            </div>
          ))}
        </div>

        <div className="deck">
          {me.getState('cards')?.map((card, index) => (
            <Button
              disabled={cardsDisabled}
              className={cardsDisabled ? 'disabled' : ''}
              onClick={() => {
                selectCard(card);
              }}
              key={index}
            >
              {card.id} {card.type} {card.name}
            </Button>
          ))}
        </div>

        <div className="targets">
          {currentPlayer === me &&
            currentPlayer.getState('availableTargets')?.map((player, index) => (
              <Button
                key={index}
                disabled={cardsDisabled}
                className={cardsDisabled ? 'disabled' : ''}
                onClick={() => {
                  selectTarget(player);
                }}
              >
                <span>{player.state.profile.name}</span>
              </Button>
            ))}
        </div>

        <div className="drawers">
          <Button
            disabled={drawersDisabled}
            className={drawersDisabled ? 'disabled' : ''}
            onClick={() => {
              handleDrawer('transport');
            }}
          >
            Piocher carte Transport
          </Button>
          <Button
            disabled={drawersDisabled}
            className={drawersDisabled ? 'disabled' : ''}
            onClick={() => {
              handleDrawer('action');
            }}
          >
            Piocher carte Action
          </Button>
        </div>
      </div>
    </>
  );
}

export default React.memo(UI);
