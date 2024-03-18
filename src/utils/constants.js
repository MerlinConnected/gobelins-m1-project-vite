export const GLOBAL_PHASE = {
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

export const TIME_START_GAME = 1;
export const TIME_START_TURN = 1;
export const TIME_PLAYER_TURN = 10;
export const TIME_END_TURN = 1;

export const MAX_POINTS = 10;
export const AMOUNT_TRANSPORT_CARDS = 10;
export const AMOUNT_ACTION_CARDS = 1;

export const transportDrawer = [
  ...new Array(AMOUNT_TRANSPORT_CARDS)
    .fill()
    .map((_, index) => ({ id: index, name: 'velo', type: 'transport', impact: 2 })),
  ...new Array(AMOUNT_TRANSPORT_CARDS)
    .fill()
    .map((_, index) => ({ id: index + AMOUNT_TRANSPORT_CARDS, name: 'voiture', type: 'transport', impact: 3 })),
  ...new Array(AMOUNT_TRANSPORT_CARDS)
    .fill()
    .map((_, index) => ({ id: index + 2 * AMOUNT_TRANSPORT_CARDS, name: 'moto', type: 'transport', impact: 4 })),
  ...new Array(AMOUNT_TRANSPORT_CARDS)
    .fill()
    .map((_, index) => ({ id: index + 3 * AMOUNT_TRANSPORT_CARDS, name: 'tramway', type: 'transport', impact: 3 })),
  ...new Array(AMOUNT_TRANSPORT_CARDS)
    .fill()
    .map((_, index) => ({ id: index + 4 * AMOUNT_TRANSPORT_CARDS, name: 'metro', type: 'transport', impact: 4 })),
];

export const actionDrawer = [
  ...new Array(AMOUNT_ACTION_CARDS).fill().map((_, index) => ({ id: index, name: 'moins1', type: 'action', impact: -1 })),
  ...new Array(AMOUNT_ACTION_CARDS).fill().map((_, index) => ({ id: index, name: 'moins2', type: 'action', impact: -2 })),
  ...new Array(AMOUNT_ACTION_CARDS)
    .fill()
    .map((_, index) => ({ id: index + AMOUNT_ACTION_CARDS, name: 'pied', type: 'action', impact: 1 })),
];