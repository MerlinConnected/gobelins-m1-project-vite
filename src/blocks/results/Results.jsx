import React from 'react';

import { useGameStateContext } from '../../provider/GameStateProvider';
import { usePlayerContext } from '../../provider/PlayerProvider';

import { myPlayer, isHost } from 'playroomkit';

import classNames from 'classnames';
import Button from '../../components/button/Button';
import styles from './Results.module.scss';
import removeRoomHash from '../../utils/removeRoomHash';

function Results({ className, ...props }) {
  const { players } = usePlayerContext();
  const { getFinishers } = useGameStateContext();

  const me = myPlayer();

  const finishers = getFinishers();

  return (
    <div className={classNames(styles.wrapper, className)} {...props}>
      <h1>{finishers.includes(me) ? 'Victoire' : 'Défaite'} !</h1>
      <h2>Résultats</h2>
      <div className={styles.results}>
        {players.map((player, index) => (
          <div key={index} className={styles.player}>
            <p>{player?.state.name}</p>
            <p>{player.getState('points')} points</p>
          </div>
        ))}
      </div>
      <Button onClick={() => removeRoomHash()}>Accueil</Button>
    </div>
  );
}

export default React.memo(Results);
