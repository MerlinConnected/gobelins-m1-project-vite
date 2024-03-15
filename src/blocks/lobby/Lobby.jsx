import React from 'react';

import { usePlayersList, getRoomCode, isHost } from 'playroomkit';

import classNames from 'classnames';

import styles from './Lobby.module.scss';

import { useGameStateContext } from '../../provider/GameStateProvider';
import { GAME_PHASE } from '../../utils/constants';

function Lobby({ className, ...props }) {
  const { setLobby, setGlobalPhase } = useGameStateContext();

  const players = usePlayersList(true);

  function copyRoomCode() {
    navigator.clipboard.writeText(getRoomCode());
  }

  function removeRoomHash() {
    window.location.hash = '';
    window.location.reload();
  }

  console.log(players);

  return (
    <>
      <div style={{ position: 'absolute', top: 0, zIndex: 1 }}>
        <button
          onClick={() => {
            copyRoomCode();
          }}
        >
          Copy room code
        </button>
        <button onClick={() => removeRoomHash()}>Leave room</button>

        {players.map((player) => (
          <p key={player.id}>{player.state.name || player.state.profile?.name}</p>
        ))}

        {isHost() && (
          <button
            onClick={() => {
              setLobby(false);
              setGlobalPhase(GAME_PHASE.startGame, true);
            }}
          >
            Start game
          </button>
        )}
      </div>
    </>
  );
}

export default React.memo(Lobby);
