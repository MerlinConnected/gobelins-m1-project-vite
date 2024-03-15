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
  const { playerPhase, setPlayerPhase } = useGameStateContext();
  const [cardsDisabled, setCardsDisabled] = useState(true);
  const [drawersDisabled, setDrawersDisabled] = useState(true);

  const currentPlayer = players[playerTurn];
  const me = myPlayer();

  const selectCard = (card) => {
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
    if (currentPlayer?.id !== me?.id) return;
    if (currentPlayer?.getState('cards')?.length < 4) {
      distributeCard(type);
    }

    if (currentPlayer?.getState('cards')?.length == 4) {
      setPlayerPhase('performFirst', true);
    }
  };

  const selectTarget = (player) => {
    currentPlayer.setState('target', player, true);
    const cards = currentPlayer.getState('cards');
    const selectedCard = currentPlayer.getState('selectedCard');

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
        }
        break;

      case PLAYER_PHASE.performFirst || PLAYER_PHASE.performLast:
        if (currentPlayer?.id === me?.id) {
          setCardsDisabled(false);
          setDrawersDisabled(true);
        }
        break;

      case PLAYER_PHASE.firstResult || PLAYER_PHASE.lastResult:
        setCardsDisabled(true);
        setDrawersDisabled(true);
        console.log('Le joueur ' + currentPlayer.state.profile.name + ' a joué' + currentPlayer.getState('selectedCard').type + ' ' + currentPlayer.getState('selectedCard').name + ' sur le joueur ' + currentPlayer.getState('target').state.profile.name);
        break;

      default:
        setCardsDisabled(true);
        setDrawersDisabled(true);
    }
  }, [getState('playerPhase')]);

  return (
    <>
      <div className={classNames(styles.wrapper, className)} {...props}>
        {currentPlayer?.id === me?.id && <p>C'est mon tour !!</p>}
        <p>Je suis {me?.state.profile.name}</p>
        <div className="styles.board">
          <h2>Classement</h2>
          {players.map((player, index) => (
            <div key={index}>
              <p>{player.state.profile.name}</p>
              <p>{player.getState('points')} points</p>
            </div>
          ))}
        </div>

        <div className="deck">
          {me.getState('cards')?.map((card, index) => (
            <Button
              onClick={() => {
                selectCard(card);
              }}
              disabled={cardsDisabled}
              // className={cardsDisabled ? 'disabled' : ''}
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
                onClick={() => {
                  selectTarget(player);
                }}
                disabled={cardsDisabled}
              // className={cardsDisabled ? 'disabled' : ''}
              >
                <span>{player.state.profile.name}</span>
              </Button>
            ))}
        </div>

        <div className="drawers">
          <Button
            onClick={() => {
              handleDrawer('transport');
            }}
            disabled={drawersDisabled}
          // className={drawersDisabled ? 'disabled' : ''}
          >
            Piocher carte Transport
          </Button>
          <Button
            onClick={() => {
              handleDrawer('action');
            }}
            disabled={drawersDisabled}
          // className={drawersDisabled ? 'disabled' : ''}
          >
            Piocher carte Action
          </Button>
        </div>
      </div>
    </>
  );
}

export default React.memo(UI);
