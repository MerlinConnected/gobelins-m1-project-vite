import React from 'react';

import { useMultiplayerState } from 'playroomkit';

let context = {};
const MessageContext = React.createContext();

export function MessageProvider({ children }) {
    const [message, setMessage] = useMultiplayerState('message', { type: 'info', text: '' });

    const gameState = {
        message,
        setMessage,
    };

    context = {
        ...gameState,
    };

    return <MessageContext.Provider value={context}>{children}</MessageContext.Provider>;
}

export function useMessageContext() {
    const context = React.useContext(MessageContext);
    if (!context) throw new Error('useMessageContext must be used within a MessageProvider');
    return context;
}
