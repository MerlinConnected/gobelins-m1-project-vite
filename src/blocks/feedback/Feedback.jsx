import React, { useEffect } from 'react';

import classNames from 'classnames';

import { motion } from 'framer-motion';

import styles from './Feedback.module.scss';
import { usePlayerContext } from '../../provider/PlayerProvider';
import StrokeText from '../../components/stroke-text/StrokeText';
import playSound from '../../utils/playSound';
import { useAudioContext } from '../../provider/AudioProvider';
import Card from '../../components/card/Card';
import { myPlayer } from 'playroomkit';

function Feedback({ className, ...props }) {
  const { playerTurn, players } = usePlayerContext();
  const { audioEnabled } = useAudioContext();

  const currentPlayer = players[playerTurn];
  const me = myPlayer();
  const selectedCard = currentPlayer.getState('selectedCard');
  const selectedTarget = currentPlayer.getState('target');

  useEffect(() => {
    playSound(selectedCard?.sound, audioEnabled, 0.1);
  }, []);

  return (
    selectedCard &&
    selectedTarget &&
    currentPlayer === me && (
      <div className={classNames(styles.wrapper, className)} {...props}>
        <motion.div
          key="feedback"
          className={styles.feedback}
          initial={{
            scale: 1,
            opacity: 0.8,
            y: 100,
          }}
          animate={{
            scale: 1.5,
            opacity: 1,
            y: 0,
          }}
          exit={{
            scale: 2.5,
            opacity: 0,
          }}
        >
          {/* <div className={styles.selectedCard}>
                    <StrokeText regular color='var(--color-content-main)'>
                        {selectedCard.type} {selectedCard.name}
                    </StrokeText> */}
          <Card
            card={selectedCard}
            active={true}
            deckEnabled={true}
            selected={true}
            isFeedback={true}
            onClick={() => {}}
          />
          {/* </div> */}

          {/* {selectedCard.type === 'action' && (
                        <div className={styles.target}>
                            <StrokeText regular color={currentPlayer?.getState('target').state?.profile?.color}>
                                {currentPlayer?.getState('target').state.name}
                            </StrokeText>
                        </div>
                    )} */}
        </motion.div>
      </div>
    )
  );
}

export default React.memo(Feedback);
