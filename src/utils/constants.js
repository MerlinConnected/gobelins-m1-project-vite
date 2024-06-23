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
    img: 'velo',
    edito: 'vélo',
    type: 'transport',
    impact: 2,
    category: [CATEGORY.deuxRoues],
    icon: '/images/vehicules/bicycle/bicycle-var1.png',
    sound: 'transport/velo.mp3'
  },
  {
    name: 'voiture',
    img: 'voiture',
    edito: 'voiture',
    type: 'transport',
    impact: 3,
    category: [CATEGORY.route, CATEGORY.moteur],
    icon: '/images/vehicules/car/car-var1.png',
    sound: 'transport/voiture.mp3'
  },
  {
    name: 'tramway',
    img: 'tramway',
    edito: 'tram',
    type: 'transport',
    impact: 3,
    category: [CATEGORY.rails, CATEGORY.commun],
    icon: '/images/vehicules/tram/tram-var1.png',
    sound: 'transport/tramway.mp3'
  },
  {
    name: 'metro',
    img: 'metro',
    edito: 'métro',
    type: 'transport',
    impact: 4,
    category: [CATEGORY.rails, CATEGORY.commun, CATEGORY.interieur],
    icon: '/images/vehicules/metro/metro-var1.png',
    sound: 'transport/metro.mp3'
  },
  {
    name: 'moto',
    img: 'moto',
    edito: 'moto',
    type: 'transport',
    impact: 4,
    category: [CATEGORY.deuxRoues, CATEGORY.route, CATEGORY.moteur],
    icon: '/images/vehicules/bike/bike-var1.png',
    sound: 'transport/moto.mp3'
  },
];

export const TIME_START_GAME = 1;
export const TIME_START_TURN = 1;
export const TIME_PLAYER_TURN = 15; // FOR PROD: 10 ou 15 jsp
export const TIME_END_TURN = 4;
export const TIME_RESULT = 1;

export const MAX_POINTS = 400; // FOR PROD: 20
export const MAX_WINNERS = 3; // FOR PROD: 3
export const AMOUNT_TRANSPORT_CARDS = 1;
export const AMOUNT_PIED_CARDS = 1;
export const AMOUNT_MINUS_CARDS = 2;

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
    img: 'moins1',
    edito: 'recule !',
    editoText: "Un mal de ventre immonde te terrasse INSTANT, gros détour à la pharmacie",
    type: 'action',
    impact: -1,
    category: Object.values(CATEGORY),
  })),
  ...new Array(AMOUNT_MINUS_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + AMOUNT_MINUS_CARDS,
    name: 'moins2',
    img: 'moins2',
    edito: 'recuule !',
    editoText: "Ta valise s'est cassée, impossible de continuer sans en racheter une",
    type: 'action',
    impact: -2,
    category: Object.values(CATEGORY),
  })),
  ...new Array(AMOUNT_PIED_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + 2 * AMOUNT_MINUS_CARDS + AMOUNT_PIED_CARDS,
    name: 'pied',
    img: 'pied1',
    edito: 'descends !',
    editoText: "Innondation du métro suite au nettoyage de la Seine pour les JO 🛀",
    type: 'action',
    impact: 1,
    category: [CATEGORY.interieur],
  })),
  ...new Array(AMOUNT_PIED_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + 2 * AMOUNT_MINUS_CARDS + 2 * AMOUNT_PIED_CARDS,
    name: 'pied',
    img: 'pied2',
    detailName: 'pied2',
    editoText: "On s'est dit qu'un peu de marche te ferait du bien !",
    edito: 'descends !',
    type: 'action',
    impact: 1,
    category: [CATEGORY.route],
  })),
  ...new Array(AMOUNT_PIED_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + 2 * AMOUNT_MINUS_CARDS + 3 * AMOUNT_PIED_CARDS,
    name: 'pied',
    img: 'pied3',
    edito: 'descends !',
    editoText: "OOhh, qu'est-ce qu'ils t'ont fait ? 😱 Tu l'avais pourtant bien sécurisé avec le cadénas !",
    type: 'action',
    impact: 1,
    category: [CATEGORY.deuxRoues],
  })),
  ...new Array(AMOUNT_PIED_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + 2 * AMOUNT_MINUS_CARDS + 4 * AMOUNT_PIED_CARDS,
    name: 'pied',
    img: 'pied4',
    edito: 'descends !',
    editoText: "Embrouille avec le chauffeur, tu voulais mettre du Djul à la place de France Radio mais il a pas trop kiffé 😕",
    type: 'action',
    impact: 1,
    category: [CATEGORY.moteur],
  })),
  ...new Array(AMOUNT_PIED_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + 2 * AMOUNT_MINUS_CARDS + 5 * AMOUNT_PIED_CARDS,
    name: 'pied',
    img: 'pied5',
    edito: 'descends !',
    editoText: "Tu aides une mamie à porter ses courses parce que t'as un grand coeur 🧡",
    type: 'action',
    impact: 1,
    category: [CATEGORY.rails],
  })),
  ...new Array(AMOUNT_PIED_CARDS).fill().map((_, index) => ({
    id: index + transportDrawer.length + 2 * AMOUNT_MINUS_CARDS + 6 * AMOUNT_PIED_CARDS,
    name: 'pied',
    img: 'pied6',
    edito: 'descends !',
    editoText: "Un sac à main a été oublié dans ta rame. Les démineurs interviennent 🚨🚨🚨",
    type: 'action',
    impact: 1,
    category: [CATEGORY.commun],
  })),
];

export const piedTransportCard = {
  id: transportDrawer.length + actionDrawer.length,
  name: 'pied',
  img: 'pied7',
  edito: 'descends !',
  type: 'transport',
  impact: 1,
  category: [CATEGORY.pied],
};

export const initialEventDrawer = [
  {
    id: transportDrawer.length + actionDrawer.length + 1,
    name: 'MANIFESTION CONTRE LES SECRET SANTAS FORCES AU TRAVAIL',
    type: 'event',
    impact: 0,
    category: CATEGORY.deuxRoues,
  },
  {
    id: transportDrawer.length + actionDrawer.length + 2,
    name: 'GILETS JAUNES EN PLEIN BARBECUE, CHIPO SAVOUREUSE',
    type: 'event',
    impact: 0,
    category: CATEGORY.route,
  },
  {
    id: transportDrawer.length + actionDrawer.length + 3,
    name: 'CAMION POUBELLE EN SERVICE, BELLE VUE SUR LES RATS',
    type: 'event',
    impact: 0,
    category: CATEGORY.moteur,
  },
  {
    id: transportDrawer.length + actionDrawer.length + 4,
    name: 'UN DEGENERE DANSE SUR LES RAILS, SERVICE INTERROMPU',
    type: 'event',
    impact: 0,
    category: CATEGORY.rails,
  },
  {
    id: transportDrawer.length + actionDrawer.length + 5,
    name: "PANNE D'ELECTRICITE, SERVICE MOMENTANEMMENT INTERROMPU",
    type: 'event',
    impact: 0,
    category: CATEGORY.interieur,
  },
  {
    id: transportDrawer.length + actionDrawer.length + 6,
    name: "MALAISE VOYAGEUR, INTERVENTION DES SECOURS EN COURS",
    type: 'event',
    impact: 0,
    category: CATEGORY.commun,
  },
];
