import React, { useState } from 'react';

import { myPlayer } from 'playroomkit';

import { usePlayerContext } from '../../provider/PlayerProvider';
import { useGameStateContext } from '../../provider/GameStateProvider';

import classNames from 'classnames';
import styles from './InfoLobby.module.scss';

import ActionButton from '../../components/action-button/ActionButton';
import Logo from '../../components/logo/Logo';
import { AnimatePresence } from 'framer-motion';
import PlayerEyes from '../../components/player-eyes/PlayerEyes';
import { useEffect } from 'react';
import CardLayers from '../../components/card-layers/CardLayers';

function InfoLobby({ className, ...props }) {
  const { setNameEditing, players } = usePlayerContext();
  const { setInfoLobby, setLobby } = useGameStateContext();

  const me = myPlayer();

  const [nameInput, setNameInput] = useState(me?.getState('name') || '');

  const goToLobby = () => {
    setInfoLobby(false);
    setLobby(true);
  };

  function goToLobby4Real(e) {
    e.preventDefault();
    me?.setState('name', nameInput);
    setNameEditing(false);
    goToLobby();
  }

  const randomEyeId = Math.floor(Math.random() * 4);

  return (
    <>
      <Logo className={styles.logo} />
      <div className={classNames(styles.wrapper, className)} {...props}>
        <form className={styles.form} onSubmit={(e) => goToLobby4Real(e)}>
          <div className={styles.background}>
            <CardLayers className={styles.pattern} id="patternPlayer" />
          </div>
          <PlayerEyes className={styles.eyes} id={randomEyeId} />
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={nameInput}
              autoFocus
              placeholder="Ton pseudo"
              maxLength={8}
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
            onClick={(e) => goToLobby4Real(e)}
          />
        </div>
      </div>
    </>
  );
}

export default React.memo(InfoLobby);
