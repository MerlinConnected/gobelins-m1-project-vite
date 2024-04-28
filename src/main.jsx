import { insertCoin } from 'playroomkit';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import App from './App';
import './styles/global.scss';

import { SpeedInsights } from '@vercel/speed-insights/react';

import { DaronProvider } from './provider/DaronProvider';
import { baseTransition, baseVariants } from './core/animation';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <DaronProvider>
    <motion.div {...baseVariants} {...baseTransition}>
      <App />
      <SpeedInsights />
    </motion.div>
  </DaronProvider>
);
