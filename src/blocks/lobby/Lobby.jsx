import React, { useEffect, useState } from 'react';
import { getRoomCode } from 'playroomkit';
import classNames from 'classnames';

import styles from './Lobby.module.scss';

import { usePlayerContext } from '../../provider/PlayerProvider';

import ActionButton from '../../components/action-button/ActionButton';
import Logo from '../../components/logo/Logo';
import PlayerCards from '../../components/player-cards/PlayerCard';
import StrokeText from '../../components/stroke-text/StrokeText';

const COLORS = [
  { regular: '#F736C3', light: '#FAC9ED' },
  { regular: '#84C203', light: '#E6F9BE' },
  { regular: '#00C4EF', light: '#BCE8F1' },
  { regular: '#FF7E0D', light: '#F9D9BD' },
];

function Lobby({ className, ...props }) {
  const { players } = usePlayerContext();
  const [assignedColors, setAssignedColors] = useState(new Map());

  function copyRoomCode() {
    navigator.clipboard.writeText(getRoomCode());
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

  players.sort((a, b) => a.getState('joinedAt') - b.getState('joinedAt'));

  return (
    <>
      <Logo className={styles.logo} />
      <div className={classNames(styles.wrapper, className)} {...props}>
        <div className={styles.content}>
          <StrokeText className={styles.title}>en attente de maître lucien...</StrokeText>
          <div className={styles.lobbyWrapper}>
            <PlayerCards player={players[0]} />
            <PlayerCards player={players[1]} />
            <PlayerCards player={players[2]} />
            <PlayerCards player={players[3]} />
          </div>
        </div>

        <div className={styles.cardsWrapper}>
          <div className={classNames(styles.first)}>
            <ActionButton
              headText="Partager"
              subText="le code"
              color="#71AFF7"
              pattern="pattern3"
              size="giga"
              gigaColor="blue"
              onClick={copyRoomCode}
            >
              {<img className={styles.svgPicto} src="/images/icons/ui/card-copy-picto.svg" alt="copy the code" />}
            </ActionButton>
          </div>
          {/* <div className={classNames(styles.second)}>
            <ActionButton
              headText="Règles"
              subText="du jeu"
              color="#DE9FFD"
              pattern="pattern3"
              size="giga"
              gigaColor="purple"
            >
              {<img className={styles.svgPicto} src="/images/icons/ui/card-rules-picto.svg" alt="play" />}
            </ActionButton>
          </div> */}
          <div className={classNames(styles.second)}>
            <ActionButton
              headText="Lancer"
              subText="la partie"
              color="#FD9FB6"
              pattern="pattern3"
              size="giga"
              gigaColor="red"
            >
              {<img className={styles.svgPicto} src="/images/icons/ui/play-picto.svg" alt="play" />}
            </ActionButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Lobby);
