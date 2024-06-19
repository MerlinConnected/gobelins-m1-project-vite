import React from 'react';

import classNames from 'classnames';
import { motion, AnimatePresence } from "framer-motion";

import styles from './EventPanel.module.scss';

import { TRANSPORT } from '../../utils/constants';
import { useEventContext } from '../../provider/EventProvider';

function EventPanel({ className, ...props }) {
    const { event } = useEventContext();

    return (
        <div className={classNames(styles.wrapper, className)} {...props}>
            <div className={styles.transports}>
                {TRANSPORT.map((transport, index) => (
                    <div key={index} className={styles.transportContainer}>
                        <div className={styles.transport}>
                            <img src={transport.icon} className={styles.icon} alt="" />
                            {event && transport.category.includes(event.card.category) ?
                                <img src="/images/icons/transport/blocked.svg" alt="" className={styles.current} /> : null
                            }
                        </div>
                        <div className={styles.tooltip}>
                            <p>{transport.name}</p>
                            <p>Vitesse: {transport.impact}</p>
                            <ul>Catégories: {transport.category.map((category, index) => (
                                <li key={index}>{category}</li>
                            ))}</ul>
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {event && (
                    <motion.div
                        className={styles.marquee}
                        initial={{
                            x: -150,
                            opacity: 0
                        }}
                        animate={{
                            x: 0,
                            opacity: 1
                        }}
                        exit={{
                            x: -150,
                            opacity: 0
                        }}
                        transition={{
                            duration: 0.8,
                            type: "spring",
                        }}
                    >
                        <div>
                            <span>{event.card.name}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

export default React.memo(EventPanel);
