import React, { useMemo } from 'react';
import classNames from 'classnames';

import { myPlayer, getState } from 'playroomkit';
import { usePlayerContext } from '../../provider/PlayerProvider';
import { useGameStateContext } from '../../provider/GameStateProvider';
import { useMessageContext } from '../../provider/MessageProvider';
import { useAudioContext } from '../../provider/AudioProvider';

import styles from './Drawer.module.scss';

import { PLAYER_PHASE, TURN_PHASE } from '../../utils/constants';

import CardLayers from '../card-layers/CardLayers';
import StrokeText from '../stroke-text/StrokeText';

function Drawer({ className, type, handleDrawnCards, ...props }) {
  const { playerTurn, players, distributeCard } = usePlayerContext();
  const { setPlayerPhase } = useGameStateContext();
  const { audioEnabled } = useAudioContext();
  const me = myPlayer();

  const currentPlayer = players[playerTurn];

  const handleDrawer = (type) => {
    if (currentPlayer?.id !== me?.id || getState('playerPhase') !== PLAYER_PHASE.drawCards) return;
    handleDrawnCards();

    if (currentPlayer?.getState('cards')?.length < 4) {
      distributeCard(type, currentPlayer);
    }

    if (currentPlayer?.getState('cards')?.length == 4) {
      setPlayerPhase('performFirst', true);
    }
  };

  const patternCard = useMemo(() => {
    let pattern = null;

    if (type === 'transport') {
      pattern = 'pattern2';
    } else {
      pattern = 'pattern3';
    }

    return pattern;
  }, []);

  const linkImage = `/images/drawers/${type}.svg`;

  return (
    type && (
      <div
        className={classNames(styles.card, {
          [styles.transportCard]: type === 'transport', [styles.actionCard]: type === 'action'
        })}
        onClick={() => handleDrawer(type)}
      >
        <div className={styles.background} />
        <div className={classNames(styles.background, styles.backgroundColored)} />
        <div className={styles.layers}>
          <CardLayers className={styles.layer} id={patternCard} />
          <CardLayers className={styles.layer} id="layer1" />
        </div>

        <img src={linkImage} className={styles.image} />

        <div className={styles.editoWrapper}>
          <StrokeText large className={styles.title}>
            {type}
          </StrokeText>
        </div>
      </div>
    )
  );
}

export default React.memo(Drawer);
