import React, { useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
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
import { drawerHovered } from '../../core/animation';
import playSound from '../../utils/playSound';

const LAYER_1 = 10;

function Drawer({ className, type, handleDrawnCards, ...props }) {
  const { playerTurn, players, distributeCard } = usePlayerContext();
  const { setPlayerPhase } = useGameStateContext();
  const { audioEnabled } = useAudioContext();
  const me = myPlayer();

  const ref = useRef(null);
  const bgRef = useRef(null);
  const layersRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const currentPlayer = players[playerTurn];

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(x, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = mouseX / width - 0.5;
    const rY = mouseY / height - 0.5;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    x.set(0);
    y.set(0);
  };

  const handleDrawer = (type) => {
    if (currentPlayer?.id !== me?.id || getState('playerPhase') !== PLAYER_PHASE.drawCards) return;
    playSound('ui4.mp3', audioEnabled);
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

  const style = (layer) => {
    return {
      transform: `translateZ(${layer}px)`,
      transformStyle: 'preserve-3d',
    };
  };

  return (
    type && (
      <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}>
        <motion.div
          ref={ref}
          className={classNames(styles.card, {
            [styles.transportCard]: type === 'transport',
            [styles.actionCard]: type === 'action',
          })}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleDrawer(type)}
          {...props}
        >
          <div className={styles.background} />
          <div
            className={classNames(styles.background, styles.backgroundColored, {
              [styles.hovered]: isHovered,
            })}
          />
          <motion.div
            className={classNames(styles.layers, {
              [styles.hovered]: isHovered,
            })}
          >
            <CardLayers className={styles.layer} id={patternCard} />
            <CardLayers className={styles.layer} id="layer1" />
          </motion.div>

          <img src={linkImage} className={styles.image} />

          <div className={styles.title}>
            <StrokeText large>{type}</StrokeText>
          </div>
        </motion.div>
      </motion.div>
    )
  );
}

export default React.memo(Drawer);
