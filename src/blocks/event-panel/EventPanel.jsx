import React from 'react';

import classNames from 'classnames';
import styles from './EventPanel.module.scss';

import { TRANSPORT } from '../../utils/constants';
import { useEventContext } from '../../provider/EventProvider';

function EventPanel({ className, ...props }) {
    const { events } = useEventContext();

    return (
        <div className={classNames(styles.wrapper, className)} {...props}>
            <div className={styles.transports}>
                {TRANSPORT.map((transport, index) => (
                    <div key={index} className={styles.transportContainer}>
                        <div className={styles.transport}>
                            <img src={transport.icon} className={styles.icon} alt="" />
                            {events?.some(event => transport.category.includes(event.category)) &&
                                <img src="/images/icons/transport/blocked.svg" alt="" className={styles.current} />
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
            <div className={styles.trafic}>
                <p>CAMION POUBELLE ATTENTION ATTENTION AHHHHHH RETARD</p>
            </div>
        </div>
    );
}

export default React.memo(EventPanel);
