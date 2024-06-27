import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { myPlayer } from 'playroomkit';

import { usePlayerContext } from '../../provider/PlayerProvider';
import { useGameStateContext } from '../../provider/GameStateProvider';

import classNames from 'classnames';
import styles from './InfoLobby.module.scss';

import ActionButton from '../../components/action-button/ActionButton';
import Logo from '../../components/logo/Logo';
import PlayerEyes from '../../components/player-eyes/PlayerEyes';
import CardLayers from '../../components/card-layers/CardLayers';
import { baseVariants, orchestrate, scaleRotateAnimation, scaleRotateAnimationInvert } from '../../core/animation';

function InfoLobby({ className, ...props }) {
  const { setNameEditing, players } = usePlayerContext();
  const { setInfoLobby, setLobby, setGlobalPhase } = useGameStateContext();

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
    <motion.div
      {...baseVariants}
      {...orchestrate({ stagger: 0.5, delay: 0.4 })}
      className={classNames(styles.wrapper, className)}
      {...props}
    >
      <motion.form {...scaleRotateAnimation} className={styles.form} onSubmit={(e) => goToLobby4Real(e)}>
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
      </motion.form>

      <div className={styles.btnWrapper}>
        <ActionButton
          className={styles.button}
          text="Rejoindre"
          color="#71AFF7"
          pattern="pattern3"
          size="xlarge"
          onClick={(e) => goToLobby4Real(e)}
          {...scaleRotateAnimationInvert}
        />
      </div>
    </motion.div>
  );
}

export default React.memo(InfoLobby);
