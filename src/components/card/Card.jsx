import React, { useState } from 'react';

import { myPlayer, getState } from 'playroomkit';
import { usePlayerContext } from '../../provider/PlayerProvider';
import { useGameStateContext } from '../../provider/GameStateProvider';

import classNames from 'classnames';

import styles from './Card.module.scss';

import { TURN_PHASE } from '../../utils/constants';

import Button from '../button/Button';

function Card({ className, key, id, active, selected, ...props }) {
  const { playerTurn, players } = usePlayerContext();
  const { handlePlayerPhase } = useGameStateContext();
  const me = myPlayer();

  const card = me.getState('cards')?.find((card) => card.id === id);

  const currentPlayer = players[playerTurn];

  const selectCard = () => {
    if (currentPlayer?.id !== me?.id) return;
    currentPlayer.setState('selectedCard', card, true);

    switch (card.type) {
      case 'action':
        const cardCategories = card.category;

        const otherPlayers = players.filter((p) => p.id !== currentPlayer.id);
        const currentTargets = otherPlayers.filter((player) =>
          player.getState('status').category.some((cat) => cardCategories.includes(cat))
        );
        currentPlayer.setState('availableTargets', currentTargets, true);
        break;
      case 'transport':
        currentPlayer.setState('availableTargets', [currentPlayer], true);
        break;
      default:
        break;
    }
  };

  const selectTarget = (player) => {
    if (currentPlayer?.id !== me?.id || !active || getState('turnPhase') !== TURN_PHASE.playTurn) return;
    currentPlayer.setState('target', player, true);
    const cards = currentPlayer.getState('cards');
    const selectedCard = currentPlayer.getState('selectedCard');
    const decisions = currentPlayer.getState('decisions');
    decisions.push({ card: selectedCard, target: player });
    currentPlayer.setState('decisions', decisions, true);

    if (selectedCard) {
      switch (selectedCard.type) {
        case 'transport':
          // setToastMessage(currentPlayer?.state.name + ' décide de prendre le ' + selectedCard.name + ' !');
          break;

        case 'action':
          if (selectedCard.name === 'pied') {
            // setToastMessage(
            //   currentPlayer?.getState('target').state.name +
            //     ' retourne à pied à cause de ' +
            //     currentPlayer?.state.name +
            //     ' !'
            // );
          } else if (selectedCard.name === 'moins') {
            // setToastMessage(
            //   currentPlayer?.getState('target').state.name +
            //     ' recule de ' +
            //     selectedCard.name +
            //     '  à cause de ' +
            //     currentPlayer?.state.name +
            //     ' !'
            // );
          }

        default:
          break;
      }

      // remove the selected card from the deck
      cards.splice(
        cards.findIndex((card) => card.id === selectedCard.id),
        1
      );
      currentPlayer.setState('cards', cards, true);
    }

    handlePlayerPhase();
  };

  const deleteCard = () => {
    if (currentPlayer?.id !== me?.id || !active) return;
    const cards = currentPlayer.getState('cards');
    cards.splice(
      cards.findIndex((c) => c.id === card.id),
      1
    );
    currentPlayer.setState('cards', cards, true);

    handlePlayerPhase();
  };

  return (
    <div {...props}>
      <Button
        className={classNames(styles.wrapper, className, { [styles.clicked]: active && selected })}
        disabled={!active}
        onClick={() => selectCard()}
      >
        <div>
          {id} {card.type} {card.name}
        </div>

        {selected && (
          <div className={styles.targets}>
            {card.type && card.type === 'transport' && (
              <Button disabled={!active} onClick={() => selectTarget(currentPlayer)}>
                <span>Changer</span>
              </Button>
            )}
            <Button className={styles.remove} disabled={!active} onClick={() => deleteCard()}>
              <span>Jeter</span>
            </Button>
          </div>
        )}
      </Button>
    </div>
  );
}

export default React.memo(Card);
