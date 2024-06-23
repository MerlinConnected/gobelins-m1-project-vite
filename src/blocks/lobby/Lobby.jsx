import React, { useEffect, useState } from 'react';
import { getRoomCode } from 'playroomkit';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import { GAME_PHASE } from '../../utils/constants';
import { baseVariants, orchestrate, textAppearRotate } from '../../core/animation';

import styles from './Lobby.module.scss';

import { usePlayerContext } from '../../provider/PlayerProvider';
import { useGameStateContext } from '../../provider/GameStateProvider';

import ActionButton from '../../components/action-button/ActionButton';
import Logo from '../../components/logo/Logo';
import PlayerCards from '../../components/player-card/PlayerCard';
import StrokeText from '../../components/stroke-text/StrokeText';

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
    setTimeout(() => setIsCopied(false), 2000); // Reset the copied state after 2 seconds
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

  // players.sort((a, b) => a.getState('joinedAt') - b.getState('joinedAt'));

  return (
    <>
      <Logo className={styles.logo} />
      <div className={classNames(styles.wrapper, className)} {...props}>
        <div className={styles.content}>
          <h3 className={styles.title}>en attente de maître lucien</h3>
          <div className={styles.lobbyWrapper}>
            <PlayerCards player={players[0]} />
            <PlayerCards player={players[1]} />
            <PlayerCards player={players[2]} />
            <PlayerCards player={players[3]} />
          </div>
        </div>

        <motion.div className={styles.cardsWrapper} {...orchestrate({ stagger: 0.1 })}>
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
              <img className={styles.svgPicto} src="/images/icons/ui/card-copy-picto.svg" alt="copy the code" />
            </ActionButton>
          </div>
          <div className={classNames(styles.second)}>
            <ActionButton
              headText="Règles"
              subText="du jeu"
              color="#DE9FFD"
              pattern="patternRules"
              size="giga"
              gigaColor="purple"
            >
              <img className={styles.svgPicto} src="/images/icons/ui/card-rules-picto.svg" alt="rules" />
            </ActionButton>
          </div>
          <div className={classNames(styles.second)}>
            <ActionButton
              headText="Lancer"
              subText="la partie"
              color="#FD9FB6"
              pattern="patternPlay"
              size="giga"
              gigaColor="red"
              onClick={() => {
                setLobby(false);
                setGlobalPhase(GAME_PHASE.startGame, true);
              }}
            >
              <img className={styles.svgPicto} src="/images/icons/ui/play-picto.svg" alt="play" />
            </ActionButton>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default React.memo(Lobby);
