import React from 'react';
import { useEffect, useState } from 'react';

import { useDaronContext } from '../../provider/DaronProvider';
import { isHost, myPlayer } from 'playroomkit';
import { Leva, useControls } from 'leva';

import classNames from 'classnames';
import Button from '../../components/button/button';

import styles from './UI.module.scss';

const DEBUG = true;

function CurrentPlayer() {
  const { playerTurn, players, myPlayer } = useDaronContext();

  return <span>{players[playerTurn]?.id === players[playerTurn]?.myId ? 'It is my turn' : 'It is not my turn'}</span>;
}

function UI({ className, ...props }) {
  const { phase, startGame, timer, playerTurn, players } = useDaronContext();
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
        currentPlayer.setState(
          'availableTargets',
          players.filter((p) => p.id !== currentPlayer.id),
          true
        );
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
      <Leva hidden={!DEBUG} />
      <div className={classNames(styles.wrapper, className)} {...props}>
        <p>Je suis {me.state.profile.name}</p>
        <div className="styles.board">
          <h2>Classement</h2>
          {players.map((player, index) => (
            <div key={index}>
              <p>{player.state.profile.name}</p>
              <p>{player.getState('points')} points</p>
            </div>
          ))}
        </div>
        <Button onClick={() => selectCard('transport')} disable={disabled ? 'disabled' : ''}>
          Avancer
        </Button>
        <Button onClick={() => selectCard('backwards')} disable={disabled ? 'disabled' : ''}>
          Reculer
        </Button>
        <div className="targets">
          {currentPlayer === me &&
            currentPlayer.getState('availableTargets')?.map((player, index) => (
              <Button
                key={index}
                onClick={() => {
                  selectTarget(index);
                }}
                disabled={disabled}
              >
                <span>{player.state.profile.name}</span>
              </Button>
            ))}
        </div>
      </div>
    </>
  );
}

export default React.memo(UI);
