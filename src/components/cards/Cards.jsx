import React, { useState, useEffect } from 'react';

import { myPlayer } from 'playroomkit';
import { useGameStateContext } from '../../provider/GameStateProvider';

import classNames from 'classnames';

import styles from './Cards.module.scss';

import Card from '../card/Card';
import { PLAYER_PHASE, TURN_PHASE } from '../../utils/constants';

function Cards({ className, cardsDisabled, ...props }) {
  const { turnPhase, playerPhase } = useGameStateContext();
  const me = myPlayer();

  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const handleCardSelection = (index) => {
    if (cardsDisabled) return;
    setSelectedCardIndex(index);
    console.log('card selected');
  };

  useEffect(() => {
    if (
      playerPhase === PLAYER_PHASE.firstResult ||
      playerPhase === PLAYER_PHASE.lastResult ||
      turnPhase === TURN_PHASE.endTurn
    )
      setSelectedCardIndex(null);
  }, [turnPhase, playerPhase]);

  return (
    <div className={classNames(styles.wrapper, className)} {...props}>
      {me.getState('cards')?.map((card, index) => (
        <Card
          key={index}
          id={card.id}
          active={!cardsDisabled}
          selected={selectedCardIndex === index}
          onClick={() => handleCardSelection(index)}
        />
      ))}
    </div>
  );
}

export default React.memo(Cards);
