import React from 'react';

import classNames from 'classnames';

import { AnimatePresence, motion } from "framer-motion";

import styles from './Message.module.scss';
import { useMessageContext } from '../../provider/MessageProvider';
import StrokeText from '../../components/stroke-text/StrokeText';

function Message({ className, ...props }) {
    const { message } = useMessageContext();

    return (
        <div className={classNames(styles.wrapper, className)} {...props}>
            <motion.p
                key={message.text}
                initial={{
                    y: 10,
                    scale: 0.6,
                }}
                animate={{
                    y: 0,
                    scale: 1,
                }}
                exit={{
                    y: 10,
                    scale: 0.6,
                }}
            >
                <StrokeText large color='var(--color-content-main)'>
                    {message.text}
                </StrokeText>
            </motion.p>
        </div>

    );
}

export default React.memo(Message);
