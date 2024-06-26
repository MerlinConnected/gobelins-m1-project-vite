import React from 'react';

import classNames from 'classnames';

import { motion } from "framer-motion";

import styles from './EventRecap.module.scss';
import StrokeText from '../../components/stroke-text/StrokeText';
import { useEventContext } from '../../provider/EventProvider';
import TransportTag from '../../components/transport-tag/TransportTag';

function EventRecap({ className, ...props }) {
    const { event } = useEventContext();

    return (
        event && (
            <>
                <motion.div
                    key="eventRecap"
                    className={classNames(styles.wrapper, className)}
                    {...props}
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                >

                    <motion.div
                        key="eventTitle"
                        initial={{
                            scale: 2,
                            opacity: 0,
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                        }}
                        exit={{
                            y: -100,
                            opacity: 0,
                        }}
                        transition={{
                            type: "spring",
                            duration: 1,
                        }}
                    >
                        <StrokeText medium className={styles.eventTitle}>
                            Nouvel Évènement
                        </StrokeText>
                    </motion.div>

                    <motion.div
                        key="eventText"
                        initial={{
                            x: -50,
                            opacity: 0,
                        }}
                        animate={{
                            x: 0,
                            opacity: 1,
                        }}
                        exit={{
                            y: 100,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.3,
                            delay: 0.3,
                        }}
                    >
                        <p
                            className={styles.eventText}
                        >{event.card.name}</p>
                    </motion.div>

                    <motion.div
                        key="eventCategory"
                        initial={{
                            scale: 2,
                            opacity: 0,
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            type: "spring",
                            duration: 0.3,
                            delay: 0.3,
                        }}
                    >
                        <TransportTag transport={event.card.category} className={styles.transportTag} />
                    </motion.div>

                    <motion.img
                        key="eventBg"
                        className={styles.eventBg}
                        initial={{
                            x: 200,
                            opacity: 0.8
                        }}
                        animate={{
                            x: 0,
                            opacity: 1,
                        }}
                        exit={{
                            x: -200,
                            opacity: 0.8,
                        }}
                        transition={{
                            duration: 0.8,
                            type: "spring",
                        }}
                        src="/images/ui/event-recap-flash-bg.svg"
                    />
                </motion.div >
            </>
        )
    );
}

export default React.memo(EventRecap);
