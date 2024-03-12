import { insertCoin } from 'playroomkit';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.scss';

import { GlobalProvider } from './provider/GlobalProvider';

const container = document.getElementById('root');
const root = createRoot(container);

insertCoin({
  skipLobby: true,
}).then(() => {
  root.render(
    <GlobalProvider>
      <App />
    </GlobalProvider>
  );
});
