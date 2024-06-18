export const GAME_PHASE = {
  lobby: 'lobby',
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
  moteur: 'Motorisé',
  rails: 'Rails',
  interieur: 'Souterain',
  commun: 'En commun',
  pied: 'Pied',
};

export const TRANSPORT = [
  {
    name: 'velo',
    edito: 'vélo',
    type: 'transport',
    impact: 2,
    category: [CATEGORY.deuxRoues],
    icon: '/images/icons/transport/velo.svg',
    sound: 'transport/velo.mp3'
  },
  {
    name: 'voiture',
    edito: 'voiture',
    type: 'transport',
    impact: 3,
    category: [CATEGORY.route, CATEGORY.moteur],
    icon: '/images/icons/transport/voiture.svg',
    sound: 'transport/voiture.mp3'
  },
  {
    name: 'tramway',
    edito: 'tram',
    type: 'transport',
    impact: 3,
    category: [CATEGORY.rails, CATEGORY.commun],
    icon: '/images/icons/transport/tramway.svg',
    sound: 'transport/tramway.mp3'
  },
  {
    name: 'metro',
    edito: 'métro',
    type: 'transport',
    impact: 4,
    category: [CATEGORY.rails, CATEGORY.commun, CATEGORY.interieur],
    icon: '/images/icons/transport/metro.svg',
    sound: 'transport/metro.mp3'
  },
  {
    name: 'moto',
    edito: 'moto',
    type: 'transport',
    impact: 4,
    category: [CATEGORY.deuxRoues, CATEGORY.route, CATEGORY.moteur],
    icon: '/images/icons/transport/moto.svg',
    sound: 'transport/moto.mp3'
  },
];

export const TIME_START_GAME = 1;
export const TIME_START_TURN = 1;
export const TIME_PLAYER_TURN = 5; // FOR PROD: 10 ou 15 jsp
export const TIME_END_TURN = 2;

export const MAX_POINTS = 400; // FOR PROD: 20
export const MAX_WINNERS = 3; // FOR PROD: 3
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
    edito: 'recuuule',
    type: 'action',
    impact: -1,
    category: Object.values(CATEGORY),
  })),
  ...new Array(AMOUNT_MINUS_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + AMOUNT_MINUS_CARDS,
    name: 'moins2',
    edito: 'recuuule',
    type: 'action',
    impact: -2,
    category: Object.values(CATEGORY),
  })),
  ...new Array(AMOUNT_PIED_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + 2 * AMOUNT_MINUS_CARDS,
    name: 'pied',
    edito: 'descends',
    type: 'action',
    impact: 1,
    category: [CATEGORY.deuxRoues],
  })),
  ...new Array(AMOUNT_PIED_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + 2 * AMOUNT_MINUS_CARDS + AMOUNT_PIED_CARDS,
    name: 'pied',
    edito: 'descends',
    type: 'action',
    impact: 1,
    category: [CATEGORY.route],
  })),
  ...new Array(AMOUNT_PIED_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + 2 * AMOUNT_MINUS_CARDS + 2 * AMOUNT_PIED_CARDS,
    name: 'pied',
    edito: 'descends',
    type: 'action',
    impact: 1,
    category: [CATEGORY.commun],
  })),
  ...new Array(AMOUNT_PIED_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + 2 * AMOUNT_MINUS_CARDS + 3 * AMOUNT_PIED_CARDS,
    name: 'pied',
    edito: 'descends',
    type: 'action',
    impact: 1,
    category: [CATEGORY.moteur],
  })),
  ...new Array(AMOUNT_PIED_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + 2 * AMOUNT_MINUS_CARDS + 4 * AMOUNT_PIED_CARDS,
    name: 'pied',
    edito: 'descends',
    type: 'action',
    impact: 1,
    category: [CATEGORY.rails],
  })),
  ...new Array(AMOUNT_PIED_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + 2 * AMOUNT_MINUS_CARDS + 5 * AMOUNT_PIED_CARDS,
    name: 'pied',
    edito: 'descends',
    type: 'action',
    impact: 1,
    category: [CATEGORY.interieur],
  })),
];

export const piedTransportCard = {
  id: transportDrawer.length + actionDrawer.length,
  name: 'pied',
  edito: 'descends',
  type: 'transport',
  impact: 1,
  category: [CATEGORY.pied],
};

export const initialEventDrawer = [
  {
    id: transportDrawer.length + actionDrawer.length + 1,
    name: 'Averses',
    type: 'event',
    impact: 0,
    category: CATEGORY.deuxRoues,
  },
  {
    id: transportDrawer.length + actionDrawer.length + 2,
    name: 'Grève',
    type: 'event',
    impact: 0,
    category: CATEGORY.route,
  },
  {
    id: transportDrawer.length + actionDrawer.length + 3,
    name: 'Panne de moteur',
    type: 'event',
    impact: 0,
    category: CATEGORY.moteur,
  },
  {
    id: transportDrawer.length + actionDrawer.length + 4,
    name: 'Travaux sur les rails',
    type: 'event',
    impact: 0,
    category: CATEGORY.rails,
  },
  {
    id: transportDrawer.length + actionDrawer.length + 5,
    name: 'Inondation',
    type: 'event',
    impact: 0,
    category: CATEGORY.interieur,
  },
  {
    id: transportDrawer.length + actionDrawer.length + 6,
    name: 'Retards dans les transports',
    type: 'event',
    impact: 0,
    category: CATEGORY.commun,
  },
];
