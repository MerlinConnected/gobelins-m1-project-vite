import React, { useState, useEffect } from 'react';

import classNames from 'classnames';

import styles from './Timer.module.scss';
import StrokeText from '../../components/stroke-text/StrokeText';
import { TIME_PLAYER_TURN, TIME_START_TURN, TURN_PHASE } from '../../utils/constants';
import { useGameStateContext } from '../../provider/GameStateProvider';
import { motion, useMotionValue } from 'framer-motion';
import { useTransform } from 'framer-motion';
import { useMotionValueEvent } from 'framer-motion';
import { animate } from 'framer-motion';
import { bezier } from '../../helpers/easing';

function Timer({ className, ...props }) {
  const { turnPhase, timer } = useGameStateContext();

  const progress = useMotionValue(0);
  const width = useTransform(progress, [0, 100], ['0%', '100%']);

  useEffect(() => {
    let duration;

    if (turnPhase === TURN_PHASE.startTurn) {
      duration = TIME_START_TURN * 1000;
      progress.set(100);
      animate(progress, 0, {
        duration: duration / 1000,
        ease: bezier.quadEaseInOut
      });
    } else if (turnPhase === TURN_PHASE.playTurn) {
      progress.set(0);
      duration = TIME_PLAYER_TURN * 1000;
      animate(progress, 100, {
        duration: duration / 1000,
        ease: 'linear'
      });
    } else {
      progress.set(100);
    }

    return () => {
      progress.set(100);
    };
  }, [turnPhase, TIME_START_TURN, TIME_PLAYER_TURN, progress]);

  return (
    <div className={classNames(styles.wrapper, className)} {...props}>

      <div className={styles.bar}>
        <div className={styles.dynamicBar}>
          <img src="/images/ui/timer.svg" className={styles.fill} />
          <motion.div className={styles.empty} style={{ width: width }}></motion.div>
        </div>
        <div className={styles.stroke} />
      </div>

      {
        turnPhase === TURN_PHASE.playTurn &&
        <StrokeText regular color="var(--color-content-main)" className={styles.seconds}>{timer} '</StrokeText>
      }

    </div >
  );
}

export default React.memo(Timer);
