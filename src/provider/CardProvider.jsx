import React, { useState } from 'react';

let context = {};
const CardContext = React.createContext(context);

export function CardProvider({ children }) {
  const [cardsDisabled, setCardsDisabled] = useState(true);

  const gameState = {
    cardsDisabled,
    setCardsDisabled,
  };

  context = {
    ...gameState,
  };

  return <CardContext.Provider value={context}>{children}</CardContext.Provider>;
}

export function useCardContext() {
  const context = React.useContext(CardContext);
  if (!context) throw new Error('useCardEngine must be used within a CardEngineProvider');
  return context;
}
