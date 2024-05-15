import React, { useState } from 'react';
import * as THREE from 'three';

import { useThree } from '@react-three/fiber';
import classNames from 'classnames';
import Button from '../../components/button/Button';
import styles from './AudioManager.module.scss';
import { useEffect } from 'react';
import CircleButton from '../../components/circle-button/CircleButton';

function AudioManager({ className, ...props }) {

    const audios = {
        background: new Audio('/audios/mariah.mp3'),
    }

    const [audioEnabled, setAudioEnabled] = useState(false); // FOR PROD: set to 'true'
    const toggleAudio = () => {
        setAudioEnabled((prev) => !prev);
    }

    useEffect(() => {
        if (audioEnabled) {
            audios.background.play();
            audios.background.loop = true;
        } else {
            audios.background.pause();
        }
        return () => {
            audios.background.pause();
        }
    }, [audioEnabled]);

    return (
        <div className={classNames(styles.wrapper, className)}>
            <CircleButton onClick={toggleAudio} icon={audioEnabled ? "soundOn" : "soundOff"} color="var(--color-button-primary)" />
        </div>
    );
}

export default React.memo(AudioManager);
