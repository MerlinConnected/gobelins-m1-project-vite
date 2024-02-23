import { useEffect, useState } from 'react';
import { useDaronEngine } from '../hooks/useDaronEngine';

import { isHost, myPlayer } from 'playroomkit';

import { Leva, useControls } from 'leva';

const DEBUG = true;
const handleClick = (direction) => {
  console.log('click', direction);
};

function CurrentPlayer() {
  const { playerTurn, players, myPlayer } = useDaronEngine();

  return <span>{players[playerTurn]?.id === players[playerTurn]?.myId ? 'It is my turn' : 'It is not my turn'}</span>;
}

export default function UI() {
  const { phase, startGame, timer, playerTurn, players, points } = useDaronEngine();
  const [disabled, setDisabled] = useState(false);

  const currentPlayer = players[playerTurn];
  const me = myPlayer();

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
      <div className="overlay">
        <div>
          <button
            onClick={() => {
              handleClick('forwards');
            }}
            className={disabled ? 'disabled' : ''}
          >
            Avancer
          </button>
          <button
            onClick={() => {
              handleClick('backwards');
            }}
            className={disabled ? 'disabled' : ''}
          >
            Reculer
          </button>
        </div>
        <span>Time left {timer}</span>
        <span>Phase {phase}</span>
        <span>{me?.state.profile.name}</span>

        <CurrentPlayer />
      </div>
    </>
  );
}
