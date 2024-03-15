import { insertCoin } from 'playroomkit';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.scss';

import { DaronProvider } from './provider/DaronProvider';

const container = document.getElementById('root');
const root = createRoot(container);

// try {
//   await insertCoin({
//     skipLobby: true,
//     maxPlayersPerRoom: 2,
//   }).then(() => {
root.render(
  <DaronProvider>
    <App />
  </DaronProvider>
);
//   });
// } catch (error) {
//   if (error.message === 'ROOM_LIMIT_EXCEEDED') {
//     root.render(
//       <div>
//         <p>casses toi de la t'es de trop</p>
//       </div>
//     );
//   }
// }
