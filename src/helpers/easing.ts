import mapValues from 'lodash/mapValues';

const linear = [0, 0, 1, 1];

const principle = [0.25, 0.1, 0.25, 1];
const principleIn = [0.42, 0.1, 1, 1];
const principleOut = [0, 0, 0.58, 1];

const quadEaseIn = [0.55, 0.085, 0.68, 0.53];
const cubicEaseIn = [0.55, 0.055, 0.675, 0.19];
const quartEaseIn = [0.895, 0.03, 0.685, 0.22];
const quintEaseIn = [0.755, 0.05, 0.855, 0.06];
const sineEaseIn = [0.47, 0, 0.745, 0.715];
const expoEaseIn = [0.95, 0.05, 0.795, 0.035];
const circEaseIn = [0.6, 0.04, 0.98, 0.335];
const backEaseIn = [0.6, -0.28, 0.735, 0.045];

const quadEaseOut = [0.25, 0.46, 0.45, 0.94];
const cubicEaseOut = [0.215, 0.61, 0.355, 1];
const quartEaseOut = [0.165, 0.84, 0.44, 1];
const quintEaseOut = [0.23, 1, 0.32, 1];
const sineEaseOut = [0.39, 0.575, 0.565, 1];
const expoEaseOut = [0.19, 1, 0.22, 1];
const circEaseOut = [0.075, 0.82, 0.165, 1];
const backEaseOut = [0.175, 0.885, 0.32, 1.275];

const quadEaseInOut = [0.455, 0.03, 0.515, 0.955];
const cubicEaseInOut = [0.645, 0.045, 0.355, 1];
const quartEaseInOut = [0.77, 0, 0.175, 1];
const quintEaseInOut = [0.86, 0, 0.07, 1];
const sineEaseInOut = [0.445, 0.05, 0.55, 0.95];
const expoEaseInOut = [1, 0, 0, 1];
const circEaseInOut = [0.785, 0.135, 0.15, 0.86];
const backEaseInOut = [0.68, -0.55, 0.265, 1.55];

const bezier = {
  linear,

  principle,
  principleIn,
  principleOut,

  quadEaseIn,
  cubicEaseIn,
  quartEaseIn,
  quintEaseIn,
  sineEaseIn,
  expoEaseIn,
  circEaseIn,
  backEaseIn,

  quadEaseOut,
  cubicEaseOut,
  quartEaseOut,
  quintEaseOut,
  sineEaseOut,
  expoEaseOut,
  circEaseOut,
  backEaseOut,

  quadEaseInOut,
  cubicEaseInOut,
  quartEaseInOut,
  quintEaseInOut,
  sineEaseInOut,
  expoEaseInOut,
  circEaseInOut,
  backEaseInOut,
};

const easing = mapValues(bezier, (array) => `cubic-bezier(${array.join(',')})`);

export default easing;
export { bezier };
