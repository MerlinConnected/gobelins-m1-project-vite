import { useEffect } from 'react';

import { usePlayersList, myPlayer, isHost } from 'playroomkit';

import classNames from 'classnames';
import styles from './PlayerCards.module.scss';

import Button from '../button/Button';

import { Toaster, toast } from 'sonner';

function PlayerCards({ className, ...props }) {
  const players = usePlayersList(true);

  const me = myPlayer();

  const tagLines = ['Gros Prouteur', 'Péteur fou', 'Chieur de première', 'caca boudin'];

  useEffect(() => {
    players.forEach((player) => {
      if (!player.getState('avatar')) {
        const randomIndex = Math.floor(Math.random() * player.avatarList.length);
        player.setState('avatar', player.avatarList[randomIndex]);
      }
      if (!player.getState('tagLine')) {
        const randomIndex = Math.floor(Math.random() * tagLines.length);
        player.setState('tagLine', tagLines[randomIndex]);
      }
    });
  }, [players.length]);

  return (
    <div className={classNames(styles.wrapper, className)}>
      {players.map((player) => (
        <div key={player.id} {...props} className={classNames({ [styles.me]: me?.id === player?.id })}>
          <img src={player.state.avatar} alt="avatar" className={styles.avatar} />
          <h2>{player.state.name || player.state.profile?.name}</h2>
          <p>{player.state.tagLine}</p>
          {isHost() && me?.id !== player.id && (
            <Button
              className={styles.white}
              onClick={() => {
                player.kick();
                toast(`${player.state.name} got kicked!`, {
                  position: 'top-center',
                });
              }}
            >
              Kick
            </Button>
          )}
          <Toaster theme="dark" />
        </div>
      ))}
    </div>
  );
}

export default PlayerCards;
