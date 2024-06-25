import React, { useMemo } from 'react';

import classNames from 'classnames';
import styles from './PlayerCard.module.scss';

import StrokeText from '../stroke-text/StrokeText';
import PlayerEyes from '../player-eyes/PlayerEyes';
import CardLayers from '../card-layers/CardLayers';

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

  // Récupération sécurisée de l'ID de l'avatar
  const playerEyesId = useMemo(() => {
    return player?.state?.avatar ?? 0;
  }, [player?.state?.avatar]);

  return (
    <div
      style={{ '--lobby-card-color': cardColor.normal, '--lobby-card-color-light': cardColor.light }}
      className={classNames(styles.wrapper, className)}
      {...props}
    >
      {player ? (
        <div className={styles.player}>
          <CardLayers className={styles.pattern} id="patternPlayer" />
          <PlayerEyes className={styles.eyes} id={1} />
          <StrokeText className={classNames(styles.text, styles.title)}>{playerName}</StrokeText>
        </div>
      ) : (
        <div className={styles.noPlayer}>
          <div className={styles.pattern} />
          <span className={styles.text}>?</span>
          <span className={styles.text}>?</span>
        </div>
      )}
    </div>
  );
}

export default PlayerCard;
