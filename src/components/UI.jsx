import { useEffect, useState } from 'react';
import { useDaronEngine } from '../hooks/useDaronEngine';

import { isHost, myPlayer } from 'playroomkit';

import { Leva, useControls } from 'leva';

const DEBUG = true;

function CurrentPlayer() {
  const { playerTurn, players, myPlayer } = useDaronEngine();

  return <span>{players[playerTurn]?.id === players[playerTurn]?.myId ? 'It is my turn' : 'It is not my turn'}</span>;
}

export default function UI() {
  const { phase, startGame, timer, playerTurn, players } = useDaronEngine();
  const [disabled, setDisabled] = useState(false);

  const currentPlayer = players[playerTurn];
  const me = myPlayer();

  const selectCard = (direction) => {
    switch (direction) {
      case 'transport':
        currentPlayer.setState('selectedCard', 'transport', true);
        break;

      case 'backwards':
        currentPlayer.setState('selectedCard', 'backwards', true);
        currentPlayer.setState('availableTargets', players.filter((p) => p.id !== currentPlayer.id), true);
        break;

      default:
        break;
    }
  };

  const selectTarget = (index) => {
    currentPlayer.setState('target', index, true);
  };

  useEffect(() => {
    switch (phase) {
      case 'playerTurn':
        if (currentPlayer?.id === me?.id) {
          // console.log('my turn');
          setDisabled(false);
        }
        break;
      default:
        setDisabled(true);
    }
  }, [phase]);

  return (
    <>
      <Leva hidden={!DEBUG || !isHost()} />
      <div className='overlay'>
        <p>Je suis {me.state.profile.name}</p>
        <div className='board'>
          <h2>Classement</h2>
          {players.map((player, index) => (
            <div
              key={index}
            >
              <p>{player.state.profile.name}</p>
              <p>{player.getState("points")} points</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            selectCard('transport');
          }}
          className={disabled ? 'disabled' : ''}
        >
          Avancer
        </button>
        <button
          onClick={() => {
            selectCard('backwards');
          }}
          className={disabled ? 'disabled' : ''}

        >
          Reculer
        </button>
        <div className='targets'>
          {currentPlayer === me && currentPlayer.getState('availableTargets')?.map((player, index) => (
            <button
              key={index}
              onClick={() => {
                selectTarget(index);
              }}
              disabled={disabled}
            >
              <span>{player.state.profile.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
