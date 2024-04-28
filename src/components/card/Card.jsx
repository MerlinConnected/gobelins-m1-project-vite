import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { myPlayer, getState } from 'playroomkit';
import { usePlayerContext } from '../../provider/PlayerProvider';
import { useGameStateContext } from '../../provider/GameStateProvider';

import classNames from 'classnames';

import styles from './Card.module.scss';

import { TURN_PHASE } from '../../utils/constants';

import Button from '../button/Button';
import { useMessageContext } from '../../provider/MessageProvider';
import { AnimatePresence } from 'framer-motion';
import { cardAppear } from '../../core/animation';
import CardLayers from '../card-layers/CardLayers';
import SpeedIndicator from '../speed-indicator/SpeedIndicator';
import { useEffect } from 'react';
import { useMemo } from 'react';

function Card({ className, card, active, selected, ...props }) {
  const { playerTurn, players, inGamePlayers } = usePlayerContext();
  const { handlePlayerPhase } = useGameStateContext();
  const { setMessage } = useMessageContext();
  const me = myPlayer();

  const currentPlayer = players[playerTurn];

  const selectCard = () => {
    if (currentPlayer?.id !== me?.id) return;
    currentPlayer.setState('selectedCard', card, true);

    switch (card.type) {
      case 'action':
        const cardCategories = card.category;

        const otherPlayers = inGamePlayers.filter((p) => p.id !== currentPlayer.id);
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
          setMessage({
            type: 'action',
            text: currentPlayer?.state.name + ' décide de prendre le ' + selectedCard.name + ' !',
          });
          break;

        case 'action':
          if (selectedCard.name === 'pied') {
            setMessage({
              type: 'action',
              text:
                currentPlayer?.getState('target').state.name +
                ' retourne à pied à cause de ' +
                currentPlayer?.state.name +
                ' !',
            });
          } else if (selectedCard.name === 'moins') {
            setMessage({
              type: 'action',
              text:
                currentPlayer?.getState('target').state.name +
                ' recule de ' +
                selectedCard.name +
                '  à cause de ' +
                currentPlayer?.state.name +
                ' !',
            });
          }

        default:
          break;
      }

      // remove the selected card from the deck
      cards.splice(
        cards.findIndex((card) => card.uuid === selectedCard.uuid),
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
      cards.findIndex((c) => c.uuid === card.uuid),
      1
    );
    currentPlayer.setState('cards', cards, true);
    setMessage({ type: 'info', text: currentPlayer?.state.name + 'a jeté une carte' });

    handlePlayerPhase();
  };

  const bgColor = useMemo(() => {
    let color = null;

    if (card.impact > 1) {
      color = `var(--color-background-transport-bg-${card.impact})`;
    } else if (card.impact === 1) {
      color = `var(--color-background-action-bg-${card.impact})`;
    } else if (card.impact < 0) {
      color = `var(--color-background-action-bg--minus-${Math.abs(card.impact)})`;
    }

    return color;
  }, []);

  const patternCard = useMemo(() => {
    let pattern = null;

    if (card.impact > 1) {
      pattern = 'pattern2';
    } else {
      pattern = 'pattern3';
    }

    return pattern;
  }, []);

  return (
    card && (
      <motion.div
        {...cardAppear}
        className={classNames(styles.wrapper, className)}
        style={{ '--background': `${bgColor}` }}
        {...props}
      >
        <div className={styles.card}>
          <div className={styles.background} />
          <div className={styles.layers}>
            <CardLayers className={styles.layer} id={patternCard} />
            <CardLayers className={styles.layer} id="layer1" />
          </div>

          <SpeedIndicator className={styles.speedIndicator} impact={card.impact} />

          <Button
            className={classNames(styles.card, { [styles.clicked]: active && selected })}
            disabled={!active}
            onClick={() => selectCard()}
          >
            <div>
              {card.id} {card.type} {card.name}
            </div>

            {selected && (
              <div className={styles.targets}>
                {card.type && card.type === 'transport' && (
                  <Button disabled={!active} onClick={() => selectTarget(currentPlayer)}>
                    <span>Changer</span>
                  </Button>
                )}

                {card.type &&
                  card.type === 'action' &&
                  currentPlayer === me &&
                  currentPlayer.getState('availableTargets')?.map((player, index) => (
                    <Button
                      className={styles.target}
                      key={index}
                      disabled={!active}
                      onClick={() => {
                        selectTarget(player);
                      }}
                    >
                      <span>{player?.state.name}</span>
                    </Button>
                  ))}
                <Button className={styles.remove} disabled={!active} onClick={() => deleteCard()}>
                  <span>Jeter</span>
                </Button>
              </div>
            )}
          </Button>
        </div>
      </motion.div>
    )
  );
}

export default React.memo(Card);
