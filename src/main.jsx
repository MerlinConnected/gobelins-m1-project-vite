import { insertCoin } from 'playroomkit';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

import { DaronEngineProvider } from './hook/useDaronEngine';

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
