import React, { useState } from 'react';

import { useGameStateContext } from '../../provider/GameStateProvider';

import classNames from 'classnames';
import styles from './Onboarding.module.scss';

import Button from '../../components/button/Button';

function Onboarding({ className, ...props }) {
  const { handleInsertCoin } = useGameStateContext();

  const [roomCode, setRoomCode] = useState('');

  return (
    <div className={classNames(styles.wrapper, className)} {...props}>
      <div>
        <h1>On Time 🛬</h1>
        <div>
          <div>
            <h2>Do you think have what it takes to catch your train ?</h2>
            <Button
              className={styles.white}
              onClick={() => {
                handleInsertCoin();
              }}
            >
              New Game
            </Button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleInsertCoin(roomCode);
            }}
          >
            <input
              type="text"
              placeholder="Enter room code"
              value={roomCode}
              onChange={(e) => {
                setRoomCode(e.target.value);
              }}
            />
            <Button type="submit">Join room</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Onboarding);
