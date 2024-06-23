import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

import styles from './Onboarding.module.scss';

import { useGameStateContext } from '../../provider/GameStateProvider';

import ActionButton from '../../components/action-button/ActionButton';
import Logo from '../../components/logo/Logo';
import { motion } from 'framer-motion';
import { orchestrate, textLineAppear } from '../../core/animation';
import { AnimatePresence } from 'framer-motion';

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
        <motion.h3 className={styles.title} {...textLineAppear}>
          comment jouer ?
        </motion.h3>
        <motion.ul className={styles.tuto} {...orchestrate({ stagger: 0.2 })}>
          <motion.ol {...textLineAppear}>Arrive au plus vite, ne sois pas dernier</motion.ol>
          <motion.ol {...textLineAppear}>Ralenti les autres et assure ta place</motion.ol>
        </motion.ul>
        <motion.div className={styles.infos} {...orchestrate({ stagger: 0.2, delay: 0.8 })}>
          <motion.span {...textLineAppear}>4 Joueurs</motion.span>
          <motion.span {...textLineAppear}>5-10 min</motion.span>
        </motion.div>
      </div>

      <motion.div className={styles.cardsWrapper} {...orchestrate({ stagger: 0.1 })}>
        <div className={classNames(styles.playWrapper)}>
          <AnimatePresence>
            <ActionButton
              headText="Rejoindre"
              subText="une partie"
              color="#71AFF7"
              pattern="patternCopy"
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
          </AnimatePresence>
        </div>
        <div className={classNames(styles.createWrapper)}>
          <AnimatePresence>
            <ActionButton
              headText="Créer"
              subText="une partie"
              color="#FD9FB6"
              pattern="patternPlay"
              size="giga"
              gigaColor="red"
              onClick={() => {
                handleInsertCoin();
              }}
            >
              {<img className={styles.playImg} src="/images/icons/ui/play-picto.svg" alt="play" />}
            </ActionButton>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default React.memo(Onboarding);
