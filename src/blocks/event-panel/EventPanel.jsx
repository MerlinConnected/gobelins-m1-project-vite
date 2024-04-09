import React from 'react';
import { useEffect, useState } from 'react';

import { usePlayerContext } from '../../provider/PlayerProvider';
import { isHost, myPlayer } from 'playroomkit';
import { getState } from 'playroomkit';

import classNames from 'classnames';
import styles from './EventPanel.module.scss';

import { useGameStateContext } from '../../provider/GameStateProvider';
import { CATEGORY, PLAYER_PHASE, TURN_PHASE } from '../../utils/constants';
import { useEventContext } from '../../provider/EventProvider';

function EventPanel({ className, ...props }) {
    const { events } = useEventContext();

    return (
        <>
            <div className={classNames(styles.wrapper, className)} {...props}>
                {events?.map(event => {
                    return <div key={event.id} className={styles.category}>{event.category}</div>;
                })}
            </div>
        </>
    );
}

export default React.memo(EventPanel);
