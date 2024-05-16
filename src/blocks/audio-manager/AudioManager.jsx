import React, { useState } from 'react';
import * as THREE from 'three';

import { useThree } from '@react-three/fiber';
import classNames from 'classnames';
import Button from '../../components/button/Button';
import styles from './AudioManager.module.scss';
import { useEffect } from 'react';
import CircleButton from '../../components/circle-button/CircleButton';
import { useAudioContext } from '../../provider/AudioProvider';

function AudioManager({ className, ...props }) {

    const { audioEnabled, setAudioEnabled } = useAudioContext();

    const music = new Audio('/audios/mariah.mp3');

    const toggleAudio = () => {
        setAudioEnabled((prev) => !prev);
    }

    useEffect(() => {
        if (audioEnabled) {
            music.play();
            music.volume = 0.2;
            music.loop = true;
        } else {
            music.pause();
        }
        return () => {
            music.pause();
        }
    }, [audioEnabled]);

    return (
        <div className={classNames(styles.wrapper, className)}>
            <CircleButton onClick={toggleAudio} icon={audioEnabled ? "soundOn" : "soundOff"} color="var(--color-button-primary)" />
        </div>
    );
}

export default React.memo(AudioManager);
