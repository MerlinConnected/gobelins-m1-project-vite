import React, { createContext, useState, useContext } from 'react';

let context = {};
export const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [audioEnabled, setAudioEnabled] = useState(true); // FOR PROD: set to 'true'

  const gameState = {
    audioEnabled,
    setAudioEnabled,
  };

  context = {
    ...gameState,
  };

  return <AudioContext.Provider value={context}>{children}</AudioContext.Provider>;
}

export function useAudioContext() {
  const context = useContext(AudioContext);
  if (!context) throw Error('useAudioContext must be used inside a `AudioProvider`');
  return context;
}
