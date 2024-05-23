import { Variant, Variants } from 'framer-motion';
import { bezier } from '../helpers/easing';

type DirectonalTransform = {
  x?: string | number;
  y?: string | number;
};

export const baseVariants: Variants = {
  initial: 'initial' as Variant,
  animate: 'animate' as Variant,
  exit: 'exit' as Variant,
};

export const baseTransition = {
  duration: 0.5,
  ease: bezier.quadEaseIn,
  // opacity: { duration: 0.5, ease: 'linear' },
};

export const cardAppear = {
  variants: {
    initial: { opacity: 0, y: '40%' },
    animate: { opacity: 1, y: '0%' },
    exit: { opacity: 0, y: '-20%' },
  },
};

export const cardInactive = {
  animate: { y: '50%', x: 0, filter: 'brightness(.8)' },
};

export const cardSelected = {
  exit: { y: '-200%', x: '0%' },
};

export const drawerHovered = {
  initial: { y: 0, rotate: 0 },
  animate: { y: 20, rotate: 5 },
};

export const conditionalAnimation = (condition: boolean, animateOverride: Variants) =>
  ({
    initial: baseVariants.initial,
    animate: (condition ? animateOverride.animate || baseVariants.animate : baseVariants.initial) as Variant,
    // exit: baseVariants.exit,
  } as Variants);

// export const cardAnimation = {
//   variants: {
//     initial: ({ y }: DirectonalTransform = {}) => ({ opacity: 0, y: y || 50 }),
//     animate: {
//       y: 0,
//     },
//     exit: ({ y }: DirectonalTransform = {}) => ({
//       y: -(y as number) || -50,
//       transition: {
//         ...baseTransition,
//         duration: 0.5,
//         ease: bezier.quadEaseIn,
//       },
//     }),
//   },
// };
