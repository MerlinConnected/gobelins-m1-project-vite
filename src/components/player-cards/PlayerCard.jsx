import { useMemo } from 'react';

import classNames from 'classnames';
import styles from './PlayerCard.module.scss';

import StrokeText from '../stroke-text/StrokeText';
import PlayerEyes from '../player-eyes/PlayerEyes';

function PlayerCard({ className, player, ...props }) {
  const playerName = player?.state?.name || player?.state?.profile?.name;

  const cardColor = useMemo(() => {
    let colors = {};
    if (player) {
      colors = {
        normal: player.state.color,
        light: player.state.colorLight,
      };
    } else {
      colors = {
        normal: '#847A6F',
        light: '#F9F7F5',
      };
    }

    return colors;
  }, [player?.state?.color, player?.state?.colorLight]);

  return (
    <div
      style={{ '--lobby-card-color': cardColor.normal, '--lobby-card-color-light': cardColor.light }}
      className={classNames(styles.wrapper, className)}
      {...props}
    >
      {player ? (
        <div className={styles.player}>
          <PlayerEyes className={styles.eyes} />
          <StrokeText className={classNames(styles.text, styles.title)}>{playerName}</StrokeText>
          <StrokeText className={classNames(styles.text, styles.title)}>{playerName}</StrokeText>
        </div>
      ) : (
        <div className={styles.noPlayer}>
          <StrokeText className={styles.text}>?</StrokeText>
          <StrokeText className={styles.text}>?</StrokeText>
        </div>
      )}
    </div>
  );
}

export default PlayerCard;
