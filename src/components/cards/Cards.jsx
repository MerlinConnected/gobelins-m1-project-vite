import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion, transform } from 'framer-motion';
import classNames from 'classnames';

import { myPlayer, getState } from 'playroomkit';
import { useGameStateContext } from '../../provider/GameStateProvider';

import styles from './Cards.module.scss';

import { PLAYER_PHASE, TURN_PHASE } from '../../utils/constants';

import Card from '../card/Card';
import { cardAppear, cardInactive, cardSelected, conditionalAnimation } from '../../core/animation';
import { usePlayerContext } from '../../provider/PlayerProvider';

function Cards({ className, cardsDisabled, ...props }) {
  const { turnPhase, playerPhase } = useGameStateContext();
  const { players, playerTurn } = usePlayerContext();
  const me = myPlayer();

  const cardsRef = React.useRef();

  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [deckEnabled, setDeckEnabled] = useState(false);
  const [radius, setRadius] = useState(null);

  const numCards = me.state.cards?.length || 0;
  const currentPlayer = players[playerTurn];

  const handleCardSelection = (index) => {
    if (cardsDisabled) return;
    setSelectedCardIndex(index === selectedCardIndex ? null : index);
  };

  useEffect(() => {
    if (
      playerPhase === PLAYER_PHASE.firstResult ||
      playerPhase === PLAYER_PHASE.lastResult ||
      turnPhase === TURN_PHASE.endTurn
    )
      setSelectedCardIndex(null);

    if (currentPlayer?.id === me?.id && getState('turnPhase') === TURN_PHASE.playTurn) setDeckEnabled(true);
  }, [turnPhase, playerPhase]);

  useEffect(() => {
    if (cardsRef.current) {
      const width = cardsRef.current.offsetWidth;

      if (numCards === 4) {
        setRadius(width / 2);
      } else if (numCards === 3) {
        setRadius(width / 3);
      } else if (numCards === 2) {
        setRadius(width / 4);
      }
    }
  }, [numCards]);

  const angleGap = Math.PI / (numCards + 1);


  const isSelectedArray = useMemo(() => {
    return me.state.cards?.map((card) => ({
      ...card,
      isSelected: selectedCardIndex === card.uuid,
    }));
  }, [selectedCardIndex, me.state.cards]);

  useEffect(() => {
    const selectedCard = isSelectedArray?.find((card) => card.isSelected);

    const isSelecting = selectedCard && selectedCard.type === 'action';

    if (isSelecting) {
      currentPlayer?.setState('isSelecting', true, true);
    } else {
      currentPlayer?.setState('isSelecting', false, true);
    }
  }, [isSelectedArray, currentPlayer]);

  return (
    <div ref={cardsRef} className={classNames(styles.wrapper, className)} {...props}>
      {radius && (
        <AnimatePresence>
          {isSelectedArray?.map((card, index) => {
            const angle = angleGap * (index + 1);
            const x = Math.cos(angle) * radius - 100;
            const y = Math.sin(angle) * radius * 0.1;
            // const isSelected = selectedCardIndex === card.uuid;

            const calculatedAngle = -(angle * 10 - 16);

            const animationDuration = {
              duration: 1,
            };

            const basicStyle = {
              position: 'absolute',
              left: `calc(50% + ${x}px)`,
              bottom: `calc(${y}px - ${card.isSelected ? -50 : 0}px)`,
              zIndex: card.isSelected ? numCards + 1 : numCards - index,
            };

            return (
              <motion.div
                layout="position"
                key={card.uuid}
                style={basicStyle}
                initial={{ rotate: calculatedAngle }}
                animate={{ rotate: calculatedAngle }}
              // exit={cardSelected.exit}
              >
                <motion.div>
                  <Card
                    card={card}
                    active={!cardsDisabled}
                    deckEnabled={deckEnabled}
                    selected={card.isSelected}
                    onClick={() => handleCardSelection(card.uuid)}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      )}
    </div>
  );
}

export default React.memo(Cards);
