import React, { useEffect, useState } from 'react';

import classNames from 'classnames';

import { motion } from 'framer-motion';

import styles from './FeedbackForTarget.module.scss';
import { usePlayerContext } from '../../provider/PlayerProvider';
import StrokeText from '../../components/stroke-text/StrokeText';
import playSound from '../../utils/playSound';
import { useAudioContext } from '../../provider/AudioProvider';
import { myPlayer } from 'playroomkit';
import { useMemo } from 'react';
import TransportTag from '../../components/transport-tag/TransportTag';
import { actionDrawer } from '../../utils/constants';
import { AnimatePresence } from 'framer-motion';

function FeedbackForTarget({ className, ...props }) {
  const { playerTurn, players } = usePlayerContext();
  const { audioEnabled } = useAudioContext();

  const currentPlayer = players[playerTurn];
  const me = myPlayer();
  const selectedCard = currentPlayer?.getState('selectedCard');
  const selectedTarget = currentPlayer?.getState('target');
  const targetPlayer = players.find((player) => player.id === selectedTarget?.id);

  const isVisible =
    selectedCard?.type === 'action' &&
    currentPlayer?.getState('target')?.id === me?.id &&
    targetPlayer?.getState('flashGekko');

  useEffect(() => {
    if (isVisible) {
      playSound('ui2.mp3', audioEnabled, 0.1);
    }
  }, [isVisible, audioEnabled]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        targetPlayer.setState('flashGekko', false, true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const assets = useMemo(() => {
    let el = { background: null, drawing: null, fontColor: null, impact: null };

    if (selectedCard) {
      el.background = `/images/cards/feedbackForTarget/background/${selectedCard.name}.svg`;
      el.drawing = `/images/cards/${selectedCard.img}.svg`;

      if (selectedCard.impact === 1) {
        el.fontColor = `var(--color-background-action-main-${selectedCard.impact})`;
      } else if (selectedCard.impact < 0) {
        el.impact = `/images/cards/feedbackForTarget/${selectedCard.name}.svg`;
        el.fontColor = `var(--color-background-action-main--minus-${Math.abs(selectedCard.impact)})`;
      }
    }

    return el;
  }, [selectedCard]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="feedbackForTarget"
          className={classNames(styles.wrapper, className)}
          {...props}
          initial={{
            scale: 1,
            opacity: 0.8,
          }}
          animate={{
            scale: 1.5,
            opacity: 1,
          }}
          exit={{
            scale: 2,
            opacity: 0,
          }}
          transition={{
            type: 'spring',
          }}
        >
          <div className={styles.contentWrapper}>
            <img src={assets.background} alt="" className={styles.background} />

            <div className={styles.content}>
              {assets.impact ? (
                <img src={assets.impact} alt="" className={styles.impact} />
              ) : (
                <TransportTag transport={selectedCard.category[0]} className={styles.transportTag} />
              )}
              <img src={assets.drawing} alt="" className={styles.drawing} />
              <StrokeText large style={{ '--font-color': `${assets.fontColor}` }} className={styles.edito}>
                {selectedCard.edito}
              </StrokeText>
              <p className={styles.editoText}>{selectedCard.editoText}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default React.memo(FeedbackForTarget);
