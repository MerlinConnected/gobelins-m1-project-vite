import React, { createContext, useState, useContext, useEffect, useMemo, PropsWithChildren } from 'react';

import { useMultiplayerState } from 'playroomkit';
import { usePlayerContext } from './PlayerProvider';
import { randInt } from 'three/src/math/MathUtils';
import { getState } from 'playroomkit';
import { initialEventDrawer } from '../utils/constants';

let context = {};
export const EventContext = createContext();

export function EventProvider({ children }) {
    const { players } = usePlayerContext();

    const [events, setEvents] = useMultiplayerState('events', []);

    const gameState = {
        events,
        setEvents,
    };

    const probability = () => {
        const number = Math.floor(Math.random() * 5) + 1;
        return !!(number % 2);
    };


    const removeEvent = () => {
        if (events.length > 0) {
            events.forEach((event) => {
                const isEventRemoved = probability();
                console.log('isEventRemoved', isEventRemoved);
                if (isEventRemoved) {
                    events.splice(events.indexOf(event), 1);
                    setEvents([...events], true);
                }
            });
        }
    }

    const addEvent = () => {
        const isEventAdded = probability();
        console.log('isEventAdded', isEventAdded);
        const newEventDrawer = handleEventDrawer();

        if (isEventAdded) {
            const randomEventIndex = randInt(0, newEventDrawer.length - 1);
            const newEventCard = newEventDrawer[randomEventIndex];

            setEvents([...events, newEventCard], true);
        }
    }

    const handleEventDrawer = () => {
        let eventDrawer = [...initialEventDrawer];
        const currentEvents = getState('events');

        if (currentEvents.length > 0) {
            // eventDrawer = initialEventDrawer.filter((event) => !currentEvents.includes(event.id));
            eventDrawer = initialEventDrawer.filter(event => !currentEvents.some(currentEvent => currentEvent.id === event.id));
        } else {
            eventDrawer = [...initialEventDrawer];
        }

        return eventDrawer;
    }

    const setBlockedPlayers = () => {
        const currentEvents = getState('events');

        if (currentEvents.length > 0) {
            players.forEach((player) => {
                const playerCategories = player.getState('status').category;
                if (currentEvents.some(event => playerCategories.includes(event.category))) {
                    player.setState('blocked', true, true);
                } else {
                    player.setState('blocked', false, true);
                }
            });
        } else {
            players.forEach((player) => {
                player.setState('blocked', false, true);
            });
        }
    }

    const handleEvent = () => {
        removeEvent();
        addEvent();
        handleEventDrawer();
        setBlockedPlayers();
    };

    context = {
        ...gameState,
        handleEvent,
    };

    return <EventContext.Provider value={context}>{children}</EventContext.Provider>;
}

export function useEventContext() {
    const context = useContext(EventContext);
    if (!context) throw Error('useEventContext must be used inside a `EventProvider`');
    return context;
}
