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

export const TIME_START_GAME = 1;
export const TIME_START_TURN = 1;
export const TIME_PLAYER_TURN = 6;
export const TIME_END_TURN = 1;

export const MAX_POINTS = 10;
export const AMOUNT_TRANSPORT_CARDS = 10;
export const AMOUNT_ACTION_CARDS = 1;

export const transportDrawer = [
  ...new Array(AMOUNT_TRANSPORT_CARDS).fill().map((_, index) => ({ id: index, name: 'velo', type: 'transport' })),
  ...new Array(AMOUNT_TRANSPORT_CARDS)
    .fill()
    .map((_, index) => ({ id: index + AMOUNT_TRANSPORT_CARDS, name: 'voiture', type: 'transport' })),
  ...new Array(AMOUNT_TRANSPORT_CARDS)
    .fill()
    .map((_, index) => ({ id: index + 2 * AMOUNT_TRANSPORT_CARDS, name: 'moto', type: 'transport' })),
  ...new Array(AMOUNT_TRANSPORT_CARDS)
    .fill()
    .map((_, index) => ({ id: index + 3 * AMOUNT_TRANSPORT_CARDS, name: 'tramway', type: 'transport' })),
  ...new Array(AMOUNT_TRANSPORT_CARDS)
    .fill()
    .map((_, index) => ({ id: index + 4 * AMOUNT_TRANSPORT_CARDS, name: 'metro', type: 'transport' })),
];

export const actionDrawer = [
  ...new Array(AMOUNT_ACTION_CARDS).fill().map((_, index) => ({ id: index, name: 'moins', type: 'action' })),
  ...new Array(AMOUNT_ACTION_CARDS)
    .fill()
    .map((_, index) => ({ id: index + AMOUNT_ACTION_CARDS, name: 'pied', type: 'action' })),
];
