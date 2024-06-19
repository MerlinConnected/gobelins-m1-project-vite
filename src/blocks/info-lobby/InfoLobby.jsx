import React, { useState } from 'react';

import { myPlayer } from 'playroomkit';

import { usePlayerContext } from '../../provider/PlayerProvider';
import { useGameStateContext } from '../../provider/GameStateProvider';

import classNames from 'classnames';
import styles from './InfoLobby.module.scss';

import Button from '../../components/button/Button';
import ActionButton from '../../components/action-button/ActionButton';
import Logo from '../../components/logo/Logo';

function InfoLobby({ className, ...props }) {
  const { setNameEditing } = usePlayerContext();
  const { setInfoLobby, setLobby } = useGameStateContext();

  const me = myPlayer();

  const [nameInput, setNameInput] = useState(me?.getState('name') || me?.state?.profile?.name || '');

  const goToLobby = () => {
    setInfoLobby(false);
    setLobby(true);
  };
  return (
    <>
      <Logo className={styles.logo} />
      <div className={classNames(styles.wrapper, className)} {...props}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            me?.setState('name', nameInput);
            setNameEditing(false);
            goToLobby();
          }}
        >
          <div className={styles.background} />
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={nameInput}
              placeholder="Ton pseudo"
              maxLength={12}
              className={styles.input}
              onChange={(e) => {
                setNameInput(e.target.value);
              }}
            />
            <span />
          </div>
        </form>

        <div className={styles.btnWrapper}>
          <ActionButton
            className={styles.button}
            text="Rejoindre"
            color="#71AFF7"
            pattern="pattern3"
            size="xlarge"
            onClick={goToLobby}
          />
        </div>
      </div>
    </>
  );
}

export default React.memo(InfoLobby);
