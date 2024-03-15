import React from 'react';

import { useGameStateContext } from '../../provider/GameStateProvider';

import classNames from 'classnames';
import styles from './Onboarding.module.scss';

import Button from '../../components/button/Button';

function Onboarding({ className, ...props }) {
  const { handleInsertCoin } = useGameStateContext();

  return (
    <div className={classNames(styles.wrapper, className)} {...props}>
      <div>
        <h1>Onboarding</h1>
        <div>
          <Button
            onClick={() => {
              handleInsertCoin();
            }}
          >
            New room
          </Button>
          <Button
            onClick={() => {
              const roomCode = prompt('Enter room code');
              if (roomCode) {
                handleInsertCoin(roomCode);
              }
            }}
          >
            Join room
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Onboarding);
