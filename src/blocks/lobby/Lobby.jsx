import React from 'react';

import { getRoomCode, isHost } from 'playroomkit';

import classNames from 'classnames';
import styles from './Lobby.module.scss';

import Button from '../../components/button/Button';
import PlayerCards from '../../components/player-cards/PlayerCards';

import { Toaster, toast } from 'sonner';

import { useGameStateContext } from '../../provider/GameStateProvider';
import { GAME_PHASE } from '../../utils/constants';
import removeRoomHash from '../../utils/removeRoomHash';

function Lobby({ className, ...props }) {
  const { setLobby, setGlobalPhase } = useGameStateContext();

  function copyRoomCode() {
    navigator.clipboard.writeText(getRoomCode());
  }

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
          <PlayerCards />
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
