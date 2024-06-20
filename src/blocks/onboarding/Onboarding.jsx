import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

import styles from './Onboarding.module.scss';

import { useGameStateContext } from '../../provider/GameStateProvider';

import ActionButton from '../../components/action-button/ActionButton';
import Logo from '../../components/logo/Logo';

function Onboarding({ className, ...props }) {
  const { handleInsertCoin } = useGameStateContext();
  const [roomCode, setRoomCode] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    const newRoomCode = [...roomCode];
    newRoomCode[index] = value.toUpperCase();
    setRoomCode(newRoomCode);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').toUpperCase().slice(0, 4);
    const newRoomCode = [...roomCode];
    for (let i = 0; i < paste.length; i++) {
      newRoomCode[i] = paste[i];
    }
    setRoomCode(newRoomCode);
    inputRefs.current[Math.min(paste.length, 3)].focus();
  };

  const handleKeyDown = (e) => {
    const index = inputRefs.current.indexOf(e.target);
    if (index !== -1 && e.keyCode === 8 && e.target.value === '') {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleInsertCoin(roomCode.join(''));
  };

  useEffect(() => {
    const handleKeyUp = (e) => {
      const index = inputRefs.current.indexOf(e.target);
      if (index !== -1 && (e.keyCode === 13 || e.target.value.length === 1)) {
        if (index < 3) {
          inputRefs.current[index + 1].focus();
        }
        if (e.keyCode === 13) {
          handleSubmit(e);
        }
      }
    };

    inputRefs.current.forEach((input) => {
      if (input) {
        input.addEventListener('keyup', handleKeyUp);
        input.addEventListener('keydown', handleKeyDown);
      }
    });

    return () => {
      inputRefs.current.forEach((input) => {
        if (input) {
          input.removeEventListener('keyup', handleKeyUp);
          input.removeEventListener('keydown', handleKeyDown);
        }
      });
    };
  }, [roomCode]);

  return (
    <div className={classNames(styles.wrapper, className)} {...props}>
      <Logo size="large" className={styles.logo} />

      <div className={styles.rulesWrapper}>
        <h3 className={styles.title}>comment jouer ?</h3>
        <div className={styles.textWrapper}>
          <p className={styles.text}>
            <span>1/</span> Arrive au plus vite, ne sois pas dernier
          </p>
          <p className={styles.text}>
            <span>2/</span> Ralenti les autres et assure ta place
          </p>
        </div>
        <div className={styles.infos}>
          <span>4 Joueurs</span>
          <span>5-10 min</span>
        </div>
      </div>

      <div className={styles.cardsWrapper}>
        <div className={classNames(styles.playWrapper)}>
          <ActionButton
            headText="Rejoindre"
            subText="une partie"
            color="#71AFF7"
            pattern="pattern3"
            size="giga"
            gigaColor="blue"
          >
            {
              <form className={styles.form} onSubmit={handleSubmit} onPaste={handlePaste}>
                {roomCode.map((code, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    id={`room-code-input-${index}`}
                    type="text"
                    value={code}
                    placeholder="_"
                    maxLength={1}
                    className={styles.input}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    disabled={index !== 0 && !roomCode[index - 1]}
                  />
                ))}
              </form>
            }
          </ActionButton>
        </div>
        <div className={classNames(styles.createWrapper)}>
          <ActionButton
            headText="Créer"
            subText="une partie"
            color="#FD9FB6"
            pattern="pattern3"
            size="giga"
            gigaColor="red"
            onClick={() => {
              handleInsertCoin();
            }}
          >
            {<img className={styles.playImg} src="/images/icons/ui/play-picto.svg" alt="play" />}
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Onboarding);
