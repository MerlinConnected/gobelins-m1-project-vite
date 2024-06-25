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
        <div className={classNames(styles.results, { [styles.resultsDefeat]: !finishers.includes(me) })}>
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
              {finishers.includes(me) && (
                <div className={styles.finishersBg}></div>
              )}
              {finishers.map((finisher, index) => (
                <div key={index} className={styles.player}>
                  <StrokeText regular className={styles.name} color={finisher.getState('color')}>
                    {finisher?.state.name}
                  </StrokeText>
                  <img src={finisher.getState('status')?.icon} alt="" className={styles.status} />
                </div>
              ))}
            </div>

            <div className={styles.looser}>

              {players.map((player, index) =>
                !finishers.includes(player) ? (
                  <div key={index} className={styles.player}>
                    <img src="/images/ui/perdantTag.svg" alt="" className={styles.perdantTag} />
                    <StrokeText regular className={styles.name} color={player.getState('color')}>
                      {player?.state.name}
                    </StrokeText>
                    <img src={player.getState('status')?.icon} alt="" className={styles.status} />
                  </div>

                ) : null
              )}
            </div>

          </div>

          <CircleButton
            onClick={() => removeRoomHash()}
            icon="replay"
            color="var(--color-button-blue)"
            large
          />
        </div>
      </motion.div>
    )
  );
}

export default React.memo(Results);
