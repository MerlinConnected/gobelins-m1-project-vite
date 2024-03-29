import React, { createContext, useState, useContext, useEffect, useMemo, PropsWithChildren } from 'react';

import { PlayerProvider } from './PlayerProvider';
import { GameStateProvider } from './GameStateProvider';
import { InitProvider } from './InitProvider';

export const DaronContext = createContext();

export const DaronProvider = ({ children }) => {
  const providers = [PlayerProvider, GameStateProvider, InitProvider].reverse();

  const initialValue = {};

  return (
    <DaronContext.Provider value={initialValue}>
      {providers.reduce(
        (children, Provider) => (
          <Provider>{children}</Provider>
        ),
        children
      )}
    </DaronContext.Provider>
  );
};

export const useDaronContext = () => {
  const context = useContext(DaronContext);
  if (!context) throw Error('useDaronContext must be used inside a `DaronProvider`');
  return context;
};
