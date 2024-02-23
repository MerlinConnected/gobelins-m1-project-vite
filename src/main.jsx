import { insertCoin } from 'playroomkit';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style/index.css';

import { DaronEngineProvider } from './hooks/useDaronEngine';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

insertCoin({
  // skipLobby: true,
}).then(() => {
  root.render(
    <DaronEngineProvider>
      <App />
    </DaronEngineProvider>
  );
});
