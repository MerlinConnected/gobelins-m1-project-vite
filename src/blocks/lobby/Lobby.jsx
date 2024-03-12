import React, { useState } from 'react';

import { usePlayersList, useMultiplayerState } from 'playroomkit';

import classNames from 'classnames';

import styles from './Lobby.module.scss';
import { myPlayer } from 'playroomkit';

import { UserPlus, UserCheck } from 'lucide-react';
import { startMatchmaking } from 'playroomkit';
import Button from '../../components/button/Button';

function Lobby({ className, ...props }) {
  const [gameState, setGameState] = useMultiplayerState('gameState', 'lobby');
  const players = usePlayersList(true);
  const me = myPlayer();

  const [invited, setInvited] = useState(false);

  const invite = () => {
    navigator.clipboard.writeText(window.location.href);
    setInvited(true);
    setTimeout(() => {
      setInvited(false);
    }, 1000);
  };

  return (
    <div className={classNames(styles.wrapper, className)}>
      <h1>Game Lobby</h1>
      <p>Waiting for players to join...</p>
      {players.map((player) => (
        <div key={player.id}>
          <p>{player.state.profile?.name}</p>
          {player.id === me?.id && (
            <>
              <div>
                <button
                  onClick={() => {
                    setGameState('loading');
                    setTimeout(() => {
                      setGameState('game');
                    }, 500);
                  }}
                >
                  Start Game
                </button>
              </div>
              <div>
                <button disabled={invited} onClick={invite}>
                  {invited ? (
                    <>
                      <UserCheck width={16} height={16} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <UserPlus width={16} height={16} />
                      Invite Friends
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default React.memo(Lobby);
