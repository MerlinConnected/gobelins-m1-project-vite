import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Intro.module.scss'; // Assuming you have some CSS for styling
import classNames from 'classnames';
import StrokeText from '../../components/stroke-text/StrokeText';
import { baseVariants, orchestrate, pageTransition, textLineAppear } from '../../core/animation';

const Intro = () => {

    return (
        <motion.div
            className={classNames(styles.wrapper)}
            {...baseVariants}
            {...pageTransition}
        >
            <motion.div
                className={styles.content}
                {...orchestrate({ stagger: 1.1, delay: 0.7 })}
            >
                <motion.span {...textLineAppear}><StrokeText>3...</StrokeText></motion.span>
                <motion.span {...textLineAppear}><StrokeText>2...</StrokeText></motion.span>
                <motion.span {...textLineAppear}><StrokeText>1...</StrokeText></motion.span>
                <motion.div {...textLineAppear} className={styles.zebardi}><StrokeText>Zébardiii !</StrokeText></motion.div>
            </motion.div>

        </motion.div>
    );
};

export default React.memo(Intro);
