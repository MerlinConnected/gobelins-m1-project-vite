import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { cardAppear } from '../../core/animation';

import { myPlayer, getState } from 'playroomkit';
import { usePlayerContext } from '../../provider/PlayerProvider';
import { useGameStateContext } from '../../provider/GameStateProvider';
import { useMessageContext } from '../../provider/MessageProvider';

import styles from './Card.module.scss';

import { TURN_PHASE } from '../../utils/constants';

import CardLayers from '../card-layers/CardLayers';
import SpeedIndicator from '../speed-indicator/SpeedIndicator';
import ImpactIndicator from '../value-indicator/ImpactIndicator';
import StrokeText from '../stroke-text/StrokeText';
import TransportTag from '../transport-tag/TransportTag';
import CircleButton from '../circle-button/CircleButton';

import Button from '../button/Button';

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

  const colors = useMemo(() => {
    let el = { bg: null, font: null };

    if (card.impact > 1) {
      el.bg = `var(--color-background-transport-bg-${card.impact})`;
      el.font = `var(--color-background-transport-main-${card.impact})`;
    } else if (card.impact === 1) {
      el.bg = `var(--color-background-action-bg-${card.impact})`;
      el.font = `var(--color-background-action-main-${card.impact})`;
    } else if (card.impact < 0) {
      el.bg = `var(--color-background-action-bg--minus-${Math.abs(card.impact)})`;
      el.font = `var(--color-background-action-main--minus-${Math.abs(card.impact)})`;
    }

    return el;
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

  console.log(card);

  const linkImage = `/images/transports/${card.name}.svg`;

  return (
    card && (
      <motion.div
        {...cardAppear}
        className={classNames(styles.wrapper, className)}
        style={{ '--background': `${colors.bg}` }}
        {...props}
      >
        <div className={styles.card} onClick={() => selectCard()}>
          <div className={styles.background} />
          <div className={styles.layers}>
            <CardLayers className={styles.layer} id={patternCard} />
            <CardLayers className={styles.layer} id="layer1" />
          </div>

          <img src={linkImage} className={styles.image} />

          {card.impact >= 1 && (
            <div className={styles.transportWrapper}>
              {card.impact >= 1 &&
                card.category.map((el) => {
                  return <TransportTag key={el} transport={el} />;
                })}
            </div>
          )}
          <ImpactIndicator className={styles.impactIndicator} impact={card.impact} />
          <SpeedIndicator className={styles.speedIndicator} impact={card.impact} />

          <div className={styles.editoWrapper}>
            <StrokeText large className={styles.test} style={{ '--font-color': `${colors.font}` }}>
              {card.edito}
            </StrokeText>
          </div>

          {selected && (
            <div className={styles.actions}>
              {card.type && card.type === 'transport' && (
                <CircleButton icon="replay" color="#0D6EFF" onClick={() => selectTarget(currentPlayer)} />
              )}
              <CircleButton icon="bin" color="#ff0d47" onClick={() => deleteCard()} />
            </div>
          )}

          {/* <Button
            className={classNames(styles.card, { [styles.clicked]: active && selected })}
            disabled={!active}
            onClick={() => selectCard()}
          >

            {selected && (
              <div className={styles.targets}>
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
              </div>
            )}
          </Button> */}
        </div>
      </motion.div>
    )
  );
}

export default React.memo(Card);
