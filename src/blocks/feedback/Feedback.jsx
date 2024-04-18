import React from 'react';

import classNames from 'classnames';

import { motion } from "framer-motion";

import styles from './Feedback.module.scss';
import { usePlayerContext } from '../../provider/PlayerProvider';

function Feedback({ className, ...props }) {
    const { playerTurn, players } = usePlayerContext();

    const currentPlayer = players[playerTurn];
    const selectedCard = currentPlayer.getState('selectedCard');
    const selectedTarget = currentPlayer.getState('target');

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
                    <p>{selectedCard.type} {selectedCard.name}</p>
                </div>

                {selectedCard.type === 'action' && (
                    <div className={styles.target}>
                        <p>{currentPlayer?.getState('target').state.name}</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default React.memo(Feedback);
