import React from 'react';

import classNames from 'classnames';

import { motion } from "framer-motion";

import styles from './EventRecap.module.scss';
import { usePlayerContext } from '../../provider/PlayerProvider';
import StrokeText from '../../components/stroke-text/StrokeText';
import { useEventContext } from '../../provider/EventProvider';
import EventPanel from '../event-panel/EventPanel';
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
                            x: -100,
                            opacity: 0,
                        }}
                        animate={{
                            x: 0,
                            opacity: 1,
                        }}
                        exit={{
                            x: 100,
                            opacity: 0,
                        }}
                        transition={{
                            type: "spring",
                            duration: 0.5,
                        }}
                    >
                        <StrokeText medium className={styles.eventTitle}>
                            Nouvel Évènement
                        </StrokeText>
                    </motion.div>

                    <motion.div
                        key="eventCategory"
                        initial={{
                            x: 100,
                            opacity: 0,
                        }}
                        animate={{
                            x: 0,
                            opacity: 1,
                        }}
                        exit={{
                            x: -100,
                            opacity: 0,
                        }}
                        transition={{
                            type: "spring",
                            duration: 0.5,
                        }}
                    >
                        <TransportTag transport={event.category} className={styles.transportTag} />
                    </motion.div>
                </motion.div>

                <motion.div
                    className={styles.flashes}
                    initial={{
                        scale: 0.6,
                        opacity: 0
                    }}
                    animate={{
                        scale: 1,
                        opacity: 1
                    }}
                    exit={{
                        scale: 0.9,
                        opacity: 0
                    }}
                    transition={{
                        duration: 0.2,
                        delay: 0.2,
                        type: "spring",
                        stiffness: 100
                    }}
                >
                    <img src="/images/ui/event/flash1.svg" alt="" className={styles.flash1} />
                    <img src="/images/ui/event/flash2.svg" alt="" className={styles.flash2} />
                    <img src="/images/ui/event/flash3.svg" alt="" className={styles.flash3} />
                    <img src="/images/ui/event/flash4.svg" alt="" className={styles.flash4} />
                    <img src="/images/ui/event/flash5.svg" alt="" className={styles.flash5} />
                    <img src="/images/ui/event/flash6.svg" alt="" className={styles.flash6} />
                    <img src="/images/ui/event/flash7.svg" alt="" className={styles.flash7} />

                </motion.div>
            </>
        )
    );
}

export default React.memo(EventRecap);
