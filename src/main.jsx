import { insertCoin } from 'playroomkit';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.scss';

import { SpeedInsights } from '@vercel/speed-insights/react';

import { DaronProvider } from './provider/DaronProvider';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <DaronProvider>
    <App />
    <SpeedInsights />
  </DaronProvider>
);
