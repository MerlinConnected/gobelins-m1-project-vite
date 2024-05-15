import React, { useState, useEffect } from 'react';

import { myPlayer } from 'playroomkit';
import { useGameStateContext } from '../../provider/GameStateProvider';

import classNames from 'classnames';

import styles from './Cards.module.scss';

import Card from '../card/Card';
import { PLAYER_PHASE, TURN_PHASE } from '../../utils/constants';
import { AnimatePresence } from 'framer-motion';
import { baseVariants } from '../../core/animation';
// import Path from '../icon/Path';

function Cards({ className, cardsDisabled, ...props }) {
  const { turnPhase, playerPhase } = useGameStateContext();
  const me = myPlayer();

  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [cards, setCards] = useState(me.getState('cards'));

  const handleCardSelection = (index) => {
    if (cardsDisabled) return;
    setSelectedCardIndex(index);
  };

  useEffect(() => {
    if (
      playerPhase === PLAYER_PHASE.firstResult ||
      playerPhase === PLAYER_PHASE.lastResult ||
      turnPhase === TURN_PHASE.endTurn
    )
      setSelectedCardIndex(null);
  }, [turnPhase, playerPhase]);

  // console.log(me.state.cards?.map((card) => card.uuid));

  return (
    <div className={classNames(styles.wrapper, className)} {...props}>
      <AnimatePresence>
        {me.state.cards?.map((card, index) => (
          <Card
            {...baseVariants}
            layout="position"
            key={card.uuid}
            className={styles.card}
            card={card}
            active={!cardsDisabled}
            selected={selectedCardIndex === index}
            onClick={() => handleCardSelection(index)}
          />
        ))}
      </AnimatePresence>

      {/* <Path className={styles.path} id="arrow" /> */}
    </div>
  );
}

export default React.memo(Cards);
