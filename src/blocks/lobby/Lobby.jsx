import React from 'react';

import { usePlayersList } from 'playroomkit';

import classNames from 'classnames';

import styles from './Lobby.module.scss';
import { myPlayer } from 'playroomkit';

function Lobby({ className, ...props }) {
  const players = usePlayersList(true);
  const me = myPlayer();

  return (
    <>
      <div className={classNames(styles.wrapper, className)}>
        <h1>Game Lobby</h1>
        <p>Waiting for players to join...</p>
        {players.map((player) => (
          <>
            <p key={player.id}>{player.state.profile.name}</p>
            {player.id === me?.id && (
              <>
                <button>Start Game</button>
              </>
            )}
          </>
        ))}
      </div>
    </>
  );
}

export default React.memo(Lobby);
