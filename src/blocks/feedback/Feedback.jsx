import React from 'react';

import classNames from 'classnames';

import { motion } from "framer-motion";

import styles from './Feedback.module.scss';
import { usePlayerContext } from '../../provider/PlayerProvider';
import StrokeText from '../../components/stroke-text/StrokeText';
import playSound from '../../utils/playSound';
import { useAudioContext } from '../../provider/AudioProvider';

function Feedback({ className, ...props }) {
    const { playerTurn, players } = usePlayerContext();
    const { audioEnabled } = useAudioContext();

    const currentPlayer = players[playerTurn];
    const selectedCard = currentPlayer.getState('selectedCard');
    const selectedTarget = currentPlayer.getState('target');

    useEffect(() => {
        playSound(selectedCard?.sound, audioEnabled);
    }, []);

    return (
        selectedCard && selectedTarget &&
        <div className={classNames(styles.wrapper, className)} {...props}>
            <motion.div
                key="feedback"
                className={styles.feedback}
                initial={{
                    scale: 0,
                }}
                animate={{
                    scale: 1.4,
                }}
                exit={{
                    scale: 0,
                }}
            >
                <div className={styles.selectedCard}>
                    <StrokeText regular color='var(--color-content-main)'>
                        {selectedCard.type} {selectedCard.name}
                    </StrokeText>
                </div>

                {selectedCard.type === 'action' && (
                    <div className={styles.target}>
                        <StrokeText regular color={currentPlayer?.getState('target').state?.profile?.color}>
                            {currentPlayer?.getState('target').state.name}
                        </StrokeText>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default React.memo(Feedback);
