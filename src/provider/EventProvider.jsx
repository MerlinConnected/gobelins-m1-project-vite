import React, { createContext, useState, useContext, useEffect, useMemo, PropsWithChildren } from 'react';

import { useMultiplayerState } from 'playroomkit';
import { usePlayerContext } from './PlayerProvider';
import { randInt } from 'three/src/math/MathUtils';
import { getState } from 'playroomkit';
import { initialEventDrawer } from '../utils/constants';

let context = {};
export const EventContext = createContext();

export function EventProvider({ children }) {
  const { setBlockedPlayers } = usePlayerContext();

  const [event, setEvent] = useMultiplayerState('event', null);
  const [impactedTurns, setImpactedTurns] = useState(0);
  const [concernedTurns, setConcernedTurns] = useState(null);
  const [eventDrawer, setEventDrawer] = useState([...initialEventDrawer]);

  const gameState = {
    event,
    setEvent,
  };

  const appearProbability = () => {
    const number = Math.floor(Math.random() * 4) + 1;
    return number === 1;
  };

  const turnsProbability = () => {
    const number = Math.floor(Math.random() * 4) + 2;
    return number;
  };

  const removeLastEvent = () => {
    if (concernedTurns && concernedTurns === impactedTurns) {
      setEvent(null, true);
      setImpactedTurns(0);
      return;
    }
  };

  const addEvent = () => {
    if (getState('event') !== null) return;

    const isEventAdded = appearProbability();

    if (isEventAdded && impactedTurns === 0) {
      const randomEventIndex = randInt(0, eventDrawer.length - 1);
      const newEventCard = eventDrawer[randomEventIndex];

      setEvent(newEventCard, true);
      setConcernedTurns(turnsProbability());

    }

  };

  const handleEventDrawer = () => {
    const currentEvent = getState('event');

    if (currentEvent !== null) {
      const filteredDrawer = initialEventDrawer.filter(
        (event) => event.id !== currentEvent.id
      );
      setEventDrawer(filteredDrawer);
    } else {
      setEventDrawer([...initialEventDrawer]);
    }
  };

  const handleCurrentEvent = () => {
    if (getState('event') === null) return;

    setImpactedTurns(impactedTurns + 1);

  };

  const handleEvent = () => {
    removeLastEvent();
    addEvent();
    handleEventDrawer();
    handleCurrentEvent();
    setBlockedPlayers(); // FOR DEV: comment this line if you don't want the players to be blocked
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
