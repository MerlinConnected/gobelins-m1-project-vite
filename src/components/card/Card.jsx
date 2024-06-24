import React, { useMemo, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import classNames from 'classnames';
import { baseVariants, cardAppear, cardInactive, cardSelected, conditionalAnimation } from '../../core/animation';

import { myPlayer, getState } from 'playroomkit';
import { usePlayerContext } from '../../provider/PlayerProvider';
import { useGameStateContext } from '../../provider/GameStateProvider';
import { useMessageContext } from '../../provider/MessageProvider';
import { useAudioContext } from '../../provider/AudioProvider';

import styles from './Card.module.scss';

import { TURN_PHASE } from '../../utils/constants';

import CardLayers from '../card-layers/CardLayers';
import SpeedIndicator from '../speed-indicator/SpeedIndicator';
import ImpactIndicator from '../value-indicator/ImpactIndicator';
import StrokeText from '../stroke-text/StrokeText';
import TransportTag from '../transport-tag/TransportTag';
import CircleButton from '../circle-button/CircleButton';
import playSound from '../../utils/playSound';

const LAYER_1 = 10;
const LAYER_2 = 20;
const LAYER_IMG = 50;
const LAYER_TITLE = 64;
const LAYER_INFOS = 40;

function Card({ className, card, active, deckEnabled, selected, isFeedback, ...props }) {
  const { playerTurn, players, inGamePlayers } = usePlayerContext();
  const { handlePlayerPhase } = useGameStateContext();
  const { setMessage } = useMessageContext();
  const { audioEnabled } = useAudioContext();
  const me = myPlayer();

  const ref = useRef(null);

  const currentPlayer = players[playerTurn];

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(x, [-0.5, 0.5], ['-10deg', '10deg']);

  // const transform = useMotionTemplate`rotateX(${ySpring}deg) rotateY(${xSpring}deg)`;

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
    x.set(0);
    y.set(0);
  };

  const selectCard = () => {
    if (currentPlayer?.id !== me?.id) return;
    playSound('ui1.mp3', audioEnabled, 0.3);
    currentPlayer.setState('selectedCard', card, true);

    switch (card.type) {
      case 'action':
        const cardCategories = card.category;

        const otherPlayers = inGamePlayers.filter((p) => p.id !== currentPlayer.id);
        const currentTargets = otherPlayers.filter((player) =>
          player.getState('status').category.some((cat) => cardCategories.includes(cat))
        );
        currentPlayer.setState('availableTargets', currentTargets, true);
        break;
      case 'transport':
        currentPlayer.setState('availableTargets', [currentPlayer], true);
        break;
      default:
        break;
    }
  };

  const changeTransport = (event) => {
    event.stopPropagation();
    if (currentPlayer?.id !== me?.id || !active || getState('turnPhase') !== TURN_PHASE.playTurn) return;
    playSound('ui2.mp3', audioEnabled, 0.3);
    currentPlayer.setState('target', currentPlayer, true);
    const cards = currentPlayer.getState('cards');
    const selectedCard = currentPlayer.getState('selectedCard');

    if (selectedCard && selectedCard.type === 'transport') {
      setMessage({
        type: 'action',
        text: currentPlayer?.state.name + ' prend ' + selectedCard.edito + ' !',
      });
      // remove the selected card from the deck
      cards.splice(
        cards.findIndex((card) => card.uuid === selectedCard.uuid),
        1
      );
      currentPlayer.setState('cards', cards, true);
    }

    handlePlayerPhase();
  };

  const deleteCard = (event) => {
    event.stopPropagation();
    if (currentPlayer?.id !== me?.id || !active) return;

    playSound('paperFlip.wav', audioEnabled, 0.3);
    const cards = currentPlayer.getState('cards');
    cards.splice(
      cards.findIndex((c) => c.uuid === card.uuid),
      1
    );
    currentPlayer.setState('cards', cards, true);
    setMessage({ type: 'info', text: currentPlayer?.state.name + ' a jeté une carte' });

    handlePlayerPhase();
  };

  const colors = useMemo(() => {
    let el = { bg: null, font: null };

    if (card.impact > 1) {
      el.bg = `var(--color-background-transport-bg-${card.impact})`;
      el.font = `var(--color-background-transport-main-${card.impact})`;
    } else if (card.impact === 1) {
      el.bg = `var(--color-background-action-bg-${card.impact})`;
      el.font = `var(--color-background-action-main-${card.impact})`;
    } else if (card.impact < 0) {
      el.bg = `var(--color-background-action-bg--minus-${Math.abs(card.impact)})`;
      el.font = `var(--color-background-action-main--minus-${Math.abs(card.impact)})`;
    }

    return el;
  }, []);

  const patternCard = useMemo(() => {
    let pattern = null;

    if (card.impact > 1) {
      pattern = 'pattern2';
    } else {
      pattern = 'pattern3';
    }

    return pattern;
  }, []);

  const linkImage = `/images/cards/${card.img}.svg`;

  const animationProps = conditionalAnimation(!active, cardInactive);

  const style = (layer) => {
    return {
      transform: `translateZ(${layer}px)`,
      transformStyle: 'preserve-3d',
    };
  };

  return (
    card && (
      <motion.div
        {...baseVariants}
        {...cardAppear}
        className={classNames(styles.wrapper, className)}
        style={{ '--background': `${colors.bg}` }}
        {...props}
      >
        <motion.div {...animationProps} whileHover={active && { scale: 1.05, transition: { duration: 0.2 } }}>
          {/* <motion.div whileHover={active && { scale: 1.05, transition: { duration: 0.2 } }}> */}
          <motion.div
            ref={ref}
            className={styles.card}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => active && selectCard()}
          >
            <div style={style(LAYER_1)} className={styles.background} />
            <div style={style(LAYER_1)} className={styles.layers}>
              <CardLayers style={style(LAYER_2)} className={styles.layer} id={patternCard} />
              <CardLayers className={styles.layer} id="layer1" />
            </div>

            <img style={style(LAYER_IMG)} src={linkImage} className={styles.image} />

            {card.impact >= 1 && (
              <motion.div style={style(LAYER_INFOS)} className={styles.transportWrapper}>
                {card.impact >= 1 &&
                  card.category.map((el) => {
                    return <TransportTag key={el} transport={el} />;
                  })}
              </motion.div>
            )}
            <ImpactIndicator style={style(LAYER_INFOS)} className={styles.impactIndicator} impact={card.impact} />
            <SpeedIndicator style={style(LAYER_INFOS)} className={styles.speedIndicator} impact={card.impact} />

            <motion.div style={style(LAYER_TITLE)} className={styles.editoWrapper}>
              <StrokeText large style={{ '--font-color': `${colors.font}` }}>
                {card.edito}
              </StrokeText>
            </motion.div>

            {!isFeedback && (
              <div style={style(LAYER_TITLE)} className={styles.actions}>
                {card.type && card.type === 'transport' && (
                  <CircleButton
                    className={classNames({ [styles.activeBtn]: selected })}
                    icon="replay"
                    color="#0D6EFF"
                    onClick={(event) => changeTransport(event)}
                  />
                )}
                <CircleButton
                  className={classNames({ [styles.activeBtn]: selected })}
                  icon="bin"
                  color="#ff0d47"
                  onClick={deleteCard}
                />
              </div>
            )}

            {/* <Button
            className={classNames(styles.card, { [styles.clicked]: active && selected })}
            disabled={!active}
            onClick={() => selectCard()}
          >

            {selected && (
              <div className={styles.targets}>
                {card.type &&
                  card.type === 'action' &&
                  currentPlayer === me &&
                  currentPlayer.getState('availableTargets')?.map((player, index) => (
                    <Button
                      className={styles.target}
                      key={index}
                      disabled={!active}
                      onClick={() => {
                        selectTarget(player);
                      }}
                    >
                      <span>{player?.state.name}</span>
                    </Button>
                  ))}
              </div>
            )}
          </Button> */}
          </motion.div>
        </motion.div>
      </motion.div>
    )
  );
}

export default React.memo(Card);
