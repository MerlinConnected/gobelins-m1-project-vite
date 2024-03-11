import React, { createContext, useState, useContext, useEffect, useMemo, PropsWithChildren } from 'react';

import { DaronProvider } from './DaronProvider';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const providers = [DaronProvider].reverse();

  const initialValue = {};

  return (
    <GlobalContext.Provider value={initialValue}>
      {providers.reduce(
        (children, Provider) => (
          <Provider>{children}</Provider>
        ),
        children
      )}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) throw Error('useGlobalContext must be used inside a `GlobalProvider`');
  return context;
};
