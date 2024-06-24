import React, { useState } from 'react';
import * as THREE from 'three';

import { useThree } from '@react-three/fiber';
import classNames from 'classnames';
import Button from '../../components/button/Button';
import styles from './AudioManager.module.scss';
import { useEffect } from 'react';
import CircleButton from '../../components/circle-button/CircleButton';
import { useAudioContext } from '../../provider/AudioProvider';

function AudioManager({ musicPhase, className, ...props }) {
  const { audioEnabled, setAudioEnabled } = useAudioContext();

  const music = new Audio(`/audios/${musicPhase}.mp3`);

  const toggleAudio = () => {
    setAudioEnabled((prev) => !prev);
  };

  useEffect(() => {
    if (audioEnabled) {
      music.play();
      music.volume = 0.1;
      music.loop = true;
    } else {
      music.pause();
    }
    return () => {
      music.pause();
    };
  }, [audioEnabled]);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <CircleButton
        onClick={toggleAudio}
        icon={audioEnabled ? 'soundOn' : 'soundOff'}
        color="var(--color-button-blue)"
      />
    </div>
  );
}

export default React.memo(AudioManager);
