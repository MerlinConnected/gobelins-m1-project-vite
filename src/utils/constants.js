export const GAME_PHASE = {
  startGame: 'startGame',
  playGame: 'playGame',
  endGame: 'endGame',
};

export const TURN_PHASE = {
  startTurn: 'startTurn',
  playTurn: 'playTurn',
  endTurn: 'endTurn',
};

export const PLAYER_PHASE = {
  drawCards: 'drawCards',
  performFirst: 'performFirst',
  firstResult: 'firstResult',
  performLast: 'performLast',
  lastResult: 'lastResult',
};

export const CATEGORY = {
  deuxRoues: '2 roues',
  route: 'Route',
  moteur: 'Moteur',
  rails: 'Rails',
  interieur: 'Intérieur',
  commun: 'Transports en commun',
  pied: 'Pied',
};

export const TRANSPORT = [
  { name: 'velo', type: 'transport', impact: 2, category: [CATEGORY.deuxRoues] },
  { name: 'voiture', type: 'transport', impact: 3, category: [CATEGORY.route, CATEGORY.moteur] },
  { name: 'tramway', type: 'transport', impact: 3, category: [CATEGORY.rails, CATEGORY.commun] },
  { name: 'metro', type: 'transport', impact: 4, category: [CATEGORY.rails, CATEGORY.commun, CATEGORY.interieur] },
  { name: 'moto', type: 'transport', impact: 4, category: [CATEGORY.deuxRoues, CATEGORY.route, CATEGORY.moteur] },
];

export const TIME_START_GAME = 1;
export const TIME_START_TURN = 1;
export const TIME_PLAYER_TURN = 10;
export const TIME_END_TURN = 2;

export const MAX_POINTS = 400; // default to 20
export const AMOUNT_TRANSPORT_CARDS = 1;
export const AMOUNT_PIED_CARDS = 2;
export const AMOUNT_MINUS_CARDS = 3;

export const transportDrawer = [
  ...new Array(AMOUNT_TRANSPORT_CARDS).fill().map((_, index) => ({ ...TRANSPORT[0], id: index })),
  ...new Array(AMOUNT_TRANSPORT_CARDS)
    .fill()
    .map((_, index) => ({ ...TRANSPORT[1], id: index + AMOUNT_TRANSPORT_CARDS })),
  ...new Array(AMOUNT_TRANSPORT_CARDS)
    .fill()
    .map((_, index) => ({ ...TRANSPORT[2], id: index + 2 * AMOUNT_TRANSPORT_CARDS })),
  ...new Array(AMOUNT_TRANSPORT_CARDS)
    .fill()
    .map((_, index) => ({ ...TRANSPORT[3], id: index + 3 * AMOUNT_TRANSPORT_CARDS })),
  ...new Array(AMOUNT_TRANSPORT_CARDS)
    .fill()
    .map((_, index) => ({ ...TRANSPORT[4], id: index + 4 * AMOUNT_TRANSPORT_CARDS })),
];

export const actionDrawer = [
  ...new Array(AMOUNT_MINUS_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length,
    name: 'moins1',
    type: 'action',
    impact: -1,
    category: Object.values(CATEGORY),
  })),
  ...new Array(AMOUNT_MINUS_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + AMOUNT_MINUS_CARDS,
    name: 'moins2',
    type: 'action',
    impact: -2,
    category: Object.values(CATEGORY),
  })),
  ...new Array(AMOUNT_PIED_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + 2 * AMOUNT_MINUS_CARDS,
    name: 'pied',
    type: 'action',
    impact: 1,
    category: [CATEGORY.deuxRoues],
  })),
  ...new Array(AMOUNT_PIED_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + 2 * AMOUNT_MINUS_CARDS + AMOUNT_PIED_CARDS,
    name: 'pied',
    type: 'action',
    impact: 1,
    category: [CATEGORY.route],
  })),
  ...new Array(AMOUNT_PIED_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + 2 * AMOUNT_MINUS_CARDS + 2 * AMOUNT_PIED_CARDS,
    name: 'pied',
    type: 'action',
    impact: 1,
    category: [CATEGORY.commun],
  })),
  ...new Array(AMOUNT_PIED_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + 2 * AMOUNT_MINUS_CARDS + 3 * AMOUNT_PIED_CARDS,
    name: 'pied',
    type: 'action',
    impact: 1,
    category: [CATEGORY.moteur],
  })),
  ...new Array(AMOUNT_PIED_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + 2 * AMOUNT_MINUS_CARDS + 4 * AMOUNT_PIED_CARDS,
    name: 'pied',
    type: 'action',
    impact: 1,
    category: [CATEGORY.rails],
  })),
  ...new Array(AMOUNT_PIED_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + 2 * AMOUNT_MINUS_CARDS + 5 * AMOUNT_PIED_CARDS,
    name: 'pied',
    type: 'action',
    impact: 1,
    category: [CATEGORY.interieur],
  })),
];

export const piedTransportCard = {
  id: transportDrawer.length + actionDrawer.length,
  name: 'pied',
  type: 'transport',
  impact: 1,
  category: [CATEGORY.pied],
};

export const initialEventDrawer = [
  {
    id: transportDrawer.length + actionDrawer.length + 1,
    name: 'accident',
    type: 'event',
    impact: 0,
    category: CATEGORY.deuxRoues,
  },
  {
    id: transportDrawer.length + actionDrawer.length + 2,
    name: 'grève',
    type: 'event',
    impact: 0,
    category: CATEGORY.route,
  },
  {
    id: transportDrawer.length + actionDrawer.length + 3,
    name: 'travaux',
    type: 'event',
    impact: 0,
    category: CATEGORY.moteur,
  },
  {
    id: transportDrawer.length + actionDrawer.length + 4,
    name: 'panne',
    type: 'event',
    impact: 0,
    category: CATEGORY.rails,
  },
  {
    id: transportDrawer.length + actionDrawer.length + 5,
    name: 'grève',
    type: 'event',
    impact: 0,
    category: CATEGORY.interieur,
  },
  {
    id: transportDrawer.length + actionDrawer.length + 6,
    name: 'accident',
    type: 'event',
    impact: 0,
    category: CATEGORY.commun,
  },
];
