import React from 'react';

import classNames from 'classnames';
import styles from './EventPanel.module.scss';

import { TRANSPORT } from '../../utils/constants';
import { useEventContext } from '../../provider/EventProvider';

function EventPanel({ className, ...props }) {
    const { events } = useEventContext();

    return (
        <div className={classNames(styles.wrapper, className)} {...props}>
            {TRANSPORT.map((transport, index) => (
                <div key={index} className={styles.transport}>
                    <div className={classNames(styles.transportIcon,
                        { [styles.current]: events?.some(event => transport.category.includes(event.category)) }
                    )}>
                        {transport.name}
                    </div>
                    <div className={styles.tooltip}>
                        <p>Vitesse: {transport.impact}</p>
                        <ul>Catégories: {transport.category.map((category, index) => (
                            <li key={index}>{category}</li>
                        ))}</ul>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default React.memo(EventPanel);
