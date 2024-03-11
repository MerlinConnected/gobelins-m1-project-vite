import { insertCoin } from 'playroomkit';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style/index.scss';

import { DaronEngineProvider } from './hooks/useDaronEngine';

const container = document.getElementById('root');
const root = createRoot(container);

insertCoin({
  skipLobby: true,
}).then(() => {
  root.render(
    <DaronEngineProvider>
      <App />
    </DaronEngineProvider>
  );
});
