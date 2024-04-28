const linear = [0, 0, 1, 1] as any;

const principle = [0.25, 0.1, 0.25, 1] as any;
const principleIn = [0.42, 0.1, 1, 1] as any;
const principleOut = [0, 0, 0.58, 1] as any;

const quadEaseIn = [0.55, 0.085, 0.68, 0.53] as any;
const cubicEaseIn = [0.55, 0.055, 0.675, 0.19] as any;
const quartEaseIn = [0.895, 0.03, 0.685, 0.22] as any;
const quintEaseIn = [0.755, 0.05, 0.855, 0.06] as any;
const sineEaseIn = [0.47, 0, 0.745, 0.715] as any;
const expoEaseIn = [0.95, 0.05, 0.795, 0.035] as any;
const circEaseIn = [0.6, 0.04, 0.98, 0.335] as any;
const backEaseIn = [0.6, -0.28, 0.735, 0.045] as any;

const quadEaseOut = [0.25, 0.46, 0.45, 0.94] as any;
const cubicEaseOut = [0.215, 0.61, 0.355, 1] as any;
const quartEaseOut = [0.165, 0.84, 0.44, 1] as any;
const quintEaseOut = [0.23, 1, 0.32, 1] as any;
const sineEaseOut = [0.39, 0.575, 0.565, 1] as any;
const expoEaseOut = [0.19, 1, 0.22, 1] as any;
const circEaseOut = [0.075, 0.82, 0.165, 1] as any;
const backEaseOut = [0.175, 0.885, 0.32, 1.275] as any;

const quadEaseInOut = [0.455, 0.03, 0.515, 0.955] as any;
const cubicEaseInOut = [0.645, 0.045, 0.355, 1] as any;
const quartEaseInOut = [0.77, 0, 0.175, 1] as any;
const quintEaseInOut = [0.86, 0, 0.07, 1] as any;
const sineEaseInOut = [0.445, 0.05, 0.55, 0.95] as any;
const expoEaseInOut = [1, 0, 0, 1] as any;
const circEaseInOut = [0.785, 0.135, 0.15, 0.86] as any;
const backEaseInOut = [0.68, -0.55, 0.265, 1.55] as any;

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

export { bezier };
