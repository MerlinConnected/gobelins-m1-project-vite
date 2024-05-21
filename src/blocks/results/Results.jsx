import React from 'react';

import { useGameStateContext } from '../../provider/GameStateProvider';
import { usePlayerContext } from '../../provider/PlayerProvider';

import StrokeText from '../../components/stroke-text/StrokeText';

import { myPlayer } from 'playroomkit';

import classNames from 'classnames';
import { motion } from 'framer-motion';
import styles from './Results.module.scss';
import removeRoomHash from '../../utils/removeRoomHash';
import CardLayers from '../../components/card-layers/CardLayers';
import CircleButton from '../../components/circle-button/CircleButton';

function Results({ className, ...props }) {
  const { players } = usePlayerContext();
  const { getFinishers } = useGameStateContext();

  const me = myPlayer();

  const finishers = getFinishers();

  players.sort((a, b) => {
    if (a.getState('winner') === null && b.getState('winner') !== null) {
      return 1;
    } else if (a.getState('winner') !== null && b.getState('winner') === null) {
      return -1;
    } else {
      return a.getState('winner') - b.getState('winner');
    }
  });

  return (
    finishers && (
      <motion.div
        key="results"
        className={classNames(styles.wrapper, className)}
        {...props}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
      >
        <div className={styles.results}>
          {finishers.includes(me) ? (
            <StrokeText large className={styles.resultsTitle}>
              Victoire
            </StrokeText>
          ) : (
            <StrokeText large className={classNames(styles.resultsTitle, styles.defeatTitle)}>
              Défaite
            </StrokeText>
          )}

          <div className={styles.players}>
            <div className={styles.finishers}>
              {finishers.map((finisher, index) => (
                <div key={index} className={styles.player}>
                  <StrokeText regular className={styles.name} color={finisher?.state.profile?.color}>
                    {finisher?.state.name}
                  </StrokeText>
                  <img src="/images/ui/marshall.jpg" alt="" className={styles.status} />
                </div>
              ))}
            </div>

            <div className={styles.looser}>
              <StrokeText className={styles.looserTitle}>
                Ce looser a raté le train :
              </StrokeText>

              {players.map((player, index) =>
                !finishers.includes(player) ? (
                  <div key={index} className={styles.player}>
                    <StrokeText regular className={styles.name} color={player?.state.profile?.color}>
                      {player?.state.name}
                    </StrokeText>
                    <img src="/images/ui/marshall.jpg" alt="" className={styles.status} />
                  </div>

                ) : null
              )}

              <div className={styles.layerWrapper}>
                <CardLayers className={styles.layer} id="pattern4" />
              </div>
            </div>

          </div>

          <CircleButton
            onClick={() => removeRoomHash()}
            icon="replay"
            color="var(--color-button-primary)"
            large
          />
        </div>
      </motion.div>
    )
  );
}

export default React.memo(Results);
