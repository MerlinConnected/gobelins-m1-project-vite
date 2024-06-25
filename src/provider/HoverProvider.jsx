import React, { createContext, useContext } from 'react';

const HoverContext = createContext(false);

export const useHover = () => useContext(HoverContext);

export default HoverContext;
