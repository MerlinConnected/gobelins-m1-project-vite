import React from 'react';

import { usePlayersList, getRoomCode, isHost } from 'playroomkit';

import classNames from 'classnames';
import styles from './Lobby.module.scss';

import Button from '../../components/button/Button';

import { Toaster, toast } from 'sonner';

import { useGameStateContext } from '../../provider/GameStateProvider';
import { GAME_PHASE } from '../../utils/constants';
import { myPlayer } from 'playroomkit';
import { useEffect } from 'react';

function Lobby({ className, ...props }) {
  const { setLobby, setGlobalPhase } = useGameStateContext();

  const players = usePlayersList(true);

  const me = myPlayer();

  function copyRoomCode() {
    navigator.clipboard.writeText(getRoomCode());
  }

  function removeRoomHash() {
    window.location.hash = '';
    window.location.reload();
  }

  useEffect(() => {
    players.forEach((player) => {
      if (!player.getState('avatar')) {
        const randomIndex = Math.floor(Math.random() * player.avatarList.length);
        player.setState('avatar', player.avatarList[randomIndex]);
      }
    });
  }, [players.length]);

  return (
    <div className={classNames(styles.wrapper, className)} {...props}>
      <div>
        <div>
          <h1>Lobby</h1>
          <div>
            <Toaster theme="dark" />
            <Button
              onClick={() => {
                toast('Code copied to clipboard!', {
                  position: 'top-center',
                });
                copyRoomCode();
              }}
            >
              Invite friends
            </Button>
          </div>
        </div>
        <div>
          <p>Players :</p>
          {players.map((player) => {
            return (
              <div className="player-card" key={player.id}>
                <img src={player.state.avatar} alt="avatar" className={styles.avatar} />
                <h2 className={classNames({ [styles.me]: me?.id === player?.id })}>
                  {player.state.name || player.state.profile?.name}
                </h2>
              </div>
            );
          })}
        </div>
        {isHost() && (
          <Button
            className={styles.white}
            onClick={() => {
              setLobby(false);
              setGlobalPhase(GAME_PHASE.startGame, true);
            }}
          >
            Start game
          </Button>
        )}
        {!isHost() && <em>Waiting for host to start</em>}
      </div>
      <Button className={styles.leave} onClick={() => removeRoomHash()}>
        Leave room
      </Button>
    </div>
  );
}

export default React.memo(Lobby);
