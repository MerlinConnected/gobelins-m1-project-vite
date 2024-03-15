import React, { useState } from 'react';

import { myPlayer } from 'playroomkit';

import { usePlayerContext } from '../../provider/PlayerProvider';
import { useGameStateContext } from '../../provider/GameStateProvider';

import classNames from 'classnames';
import styles from './InfoLobby.module.scss';

import Button from '../../components/button/Button';

function InfoLobby({ className, ...props }) {
  const { setNameEditing } = usePlayerContext();
  const { setInfoLobby, setLobby } = useGameStateContext();

  const me = myPlayer();

  const [nameInput, setNameInput] = useState(me?.getState('name') || me?.state?.profile?.name || '');

  const goToLobby = () => {
    setInfoLobby(false);
    setLobby(true);
  };

  console.log(me);
  return (
    <div className={classNames(styles.wrapper, className)} {...props}>
      <div>
        <form
          onSubmit={() => {
            me?.setState('name', nameInput);
            setNameEditing(false);
            goToLobby();
          }}
        >
          <input
            type="text"
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
            }}
          />
          <Button type="submit">Join game</Button>
        </form>
      </div>
    </div>
  );
}

export default React.memo(InfoLobby);
