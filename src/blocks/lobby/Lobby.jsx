import React, { useEffect, useState, useMemo } from 'react';
import { getRoomCode, isHost } from 'playroomkit';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import { GAME_PHASE } from '../../utils/constants';
import { baseVariants, orchestrate, textAppearRotate, textLineAppear } from '../../core/animation';

import styles from './Lobby.module.scss';

import { usePlayerContext } from '../../provider/PlayerProvider';
import { useGameStateContext } from '../../provider/GameStateProvider';

import ActionButton from '../../components/action-button/ActionButton';
import Logo from '../../components/logo/Logo';
import PlayerCards from '../../components/player-card/PlayerCard';
import StrokeText from '../../components/stroke-text/StrokeText';
import SwitchImage from '../../components/switch-image/SwitchImage';

const COLORS = [
  { regular: '#F736C3', light: '#FAC9ED' },
  { regular: '#84C203', light: '#E6F9BE' },
  { regular: '#00C4EF', light: '#BCE8F1' },
  { regular: '#FF7E0D', light: '#F9D9BD' },
];

function Lobby({ className, ...props }) {
  const { setLobby, setGlobalPhase } = useGameStateContext();
  const { players } = usePlayerContext();
  const [assignedColors, setAssignedColors] = useState(new Map());
  const [isCopied, setIsCopied] = useState(false);

  function copyRoomCode() {
    navigator.clipboard.writeText(getRoomCode());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 800); // Reset the copied state after 2 seconds
  }

  useEffect(() => {
    const updatedColors = new Map(assignedColors);

    players.forEach((player, index) => {
      if (!player.getState('color') && !player.getState('colorLight')) {
        const assignedColor = COLORS[index % COLORS.length];
        player.setState('color', assignedColor.regular, true);
        player.setState('colorLight', assignedColor.light, true);
        updatedColors.set(player.id, assignedColor);
      }
      if (!player.getState('joinedAt')) {
        player.setState('joinedAt', Date.now());
      }
      if (!player.getState('avatar')) {
        player.setState('avatar', player.avatarList[index]);
      }
    });

    setAssignedColors(updatedColors);
  }, [players]);

  const isFull = useMemo(() => players.length >= 4, [players]);

  return (
    <>
      <Logo className={styles.logo} />
      <motion.div {...baseVariants} className={classNames(styles.wrapper, className)} {...props}>
        <div className={styles.content}>
          {isHost() ? (
            <motion.h3 {...textLineAppear} className={styles.title}>
              en attente des autres joueurs
            </motion.h3>
          ) : (
            <motion.h3 {...textLineAppear} className={styles.title}>
              en attente du boss
            </motion.h3>
          )}
          <motion.div {...textLineAppear} {...orchestrate({ stagger: 0.2 })} className={styles.lobbyWrapper}>
            <PlayerCards player={players[0]} />
            <PlayerCards player={players[1]} />
            <PlayerCards player={players[2]} />
            <PlayerCards player={players[3]} />
          </motion.div>
        </div>

        <motion.div {...orchestrate({ stagger: 0.1, delay: 0.3 })} className={styles.cardsWrapper}>
          <div className={classNames(styles.first)}>
            <ActionButton
              headText="Partager"
              subText="le code"
              color="#71AFF7"
              pattern="patternCopy"
              size="giga"
              gigaColor="blue"
              onClick={copyRoomCode}
            >
              <AnimatePresence>
                {isCopied && (
                  <motion.div {...baseVariants} {...textAppearRotate} className={styles.copy}>
                    <StrokeText className={styles.text}>copié</StrokeText>
                  </motion.div>
                )}
              </AnimatePresence>
              <SwitchImage
                className={styles.switchImage}
                link1="/images/icons/ui/card-copy-picto-1.svg"
                link2="/images/icons/ui/card-copy-picto-2.svg"
              />
            </ActionButton>
          </div>
          {isHost() ? (
            <div className={classNames(styles.second)}>
              <ActionButton
                headText="Lancer"
                subText="la partie"
                color="#FD9FB6"
                pattern="patternPlay"
                size="giga"
                gigaColor="red"
                active={isFull}
                onClick={() => {
                  setLobby(false);
                  setGlobalPhase(GAME_PHASE.startGame, true);
                }}
              >
                <SwitchImage
                  className={styles.switchImage}
                  link1="/images/icons/ui/play-picto-1.svg"
                  link2="/images/icons/ui/play-picto-2.svg"
                />
              </ActionButton>
            </div>
          ) : (
            <div className={classNames(styles.second)}>
              <ActionButton
                headText="Règles"
                subText="du jeu"
                color="#DE9FFD"
                pattern="patternRules"
                size="giga"
                gigaColor="purple"
              >
                <SwitchImage
                  className={styles.switchImage}
                  link1="/images/icons/ui/card-rules-picto-1.svg"
                  link2="/images/icons/ui/card-rules-picto-2.svg"
                />
              </ActionButton>
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}

export default React.memo(Lobby);
