import React from 'react';

import { useGameStateContext } from '../../provider/GameStateProvider';
import { usePlayerContext } from '../../provider/PlayerProvider';

import StrokeText from '../../components/stroke-text/StrokeText';

import { myPlayer } from 'playroomkit';

import classNames from 'classnames';
import { motion } from "framer-motion";
import styles from './Results.module.scss';
import removeRoomHash from '../../utils/removeRoomHash';
import { MAX_POINTS } from '../../utils/constants';
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
        className={classNames(styles.wrapper, className)} {...props}
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
          {
            finishers.includes(me) ? (
              <StrokeText large className={styles.resultsTitle}>
                Victoire
              </StrokeText>
            ) : (
              <StrokeText large className={classNames(styles.resultsTitle, styles.defeatTitle)}>
                Défaite
              </StrokeText>
            )
          }

          <div className={styles.players}>
            <div className={styles.finishers}>
              {finishers.map((finisher, index) => (
                <div key={index} className={styles.finisher}>
                  <StrokeText regular className={styles.name} color={finisher?.state.profile?.color}>
                    {finisher?.state.name}
                  </StrokeText>
                  <img src="/images/ui/marshall.jpg" alt="" className={styles.status} />
                </div>
              ))}
            </div>
            <div className={styles.loosers}>
              {players.map((player, index) => (
                finishers.includes(player) ?
                  <div key={index} className={styles.looserWrapper}>
                    <div className={styles.looser}>
                      <img src="/images/ui/marshall.jpg" alt="" className={styles.status} />
                      <StrokeText regular className={styles.name}>
                        {player?.state.name}
                      </StrokeText>
                      <p className={styles.distanceLeft}>{MAX_POINTS - player.getState('points') < 0 ? 0 : MAX_POINTS - player.getState('points')} km</p>
                    </div>
                    <div className={styles.bgWrapper}>
                      <div className={styles.layerWrapper} style={{ backgroundColor: player?.state.profile?.color }}>
                        <CardLayers className={styles.layer} id="pattern_nbr" />
                      </div>
                    </div>
                  </div>
                  : null
              ))}
            </div>
          </div>

          <CircleButton onClick={() => removeRoomHash()} icon='replay' color='var(--color-background-transport-main-3)' />

        </div>

      </motion.div>
    )
  );
}

export default React.memo(Results);
