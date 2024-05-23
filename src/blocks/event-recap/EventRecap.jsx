import React from 'react';

import classNames from 'classnames';

import { motion } from "framer-motion";

import styles from './EventRecap.module.scss';
import { usePlayerContext } from '../../provider/PlayerProvider';
import StrokeText from '../../components/stroke-text/StrokeText';
import { useEventContext } from '../../provider/EventProvider';
import EventPanel from '../event-panel/EventPanel';

function EventRecap({ className, ...props }) {
    const { events } = useEventContext();

    return (
        <>
            <div className={classNames(styles.wrapper, className)} {...props}>
                <motion.div
                    key="eventRecap"
                    className={styles.eventRecap}
                    initial={{
                        scale: 0,
                    }}
                    animate={{
                        scale: 1,
                    }}
                    exit={{
                        scale: 0,
                    }}
                >
                    <StrokeText medium className={styles.eventTitle}>
                        Évènements
                    </StrokeText>
                    {events.length != 0 ? <div className={styles.events}>{events.map((event, index) => (
                        <div key={index} className={styles.event}>
                            <p>{event.name}</p>
                            <p>{event.category}</p>
                        </div>
                    ))}</div> :
                        <p>Aucun évènement, trafic fluide 🙏</p>
                    }
                </motion.div>
            </div>
            <motion.div
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
                <img src="/images/ui/ribbon-top.png" alt="" className={styles.ribbonTop} />
                <img src="/images/ui/ribbon-bottom.png" alt="" className={styles.ribbonBottom} />
            </motion.div>
        </>
    );
}

export default React.memo(EventRecap);
