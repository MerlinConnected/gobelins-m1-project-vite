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

export const homeBaseTransition = {
  duration: 0.3,
  ease: bezier.principle,
};

export const cardAppear = {
  variants: {
    initial: { opacity: 0, y: '40%' },
    animate: { opacity: 1, y: '0%' },
    exit: { opacity: 0, y: '-20%' },
  },
};

export const homeCardAppear = {
  variants: {
    initial: { opacity: 0, y: '40%' },
    animate: { opacity: 1, y: '0%' },
    exit: { opacity: 0, y: '40%' },
  },
  transition: { ...homeBaseTransition },
};

export const textAppearRotate = {
  variants: {
    initial: { opacity: 0, scale: 0.25, rotate: -6 },
    animate: { opacity: 1, scale: 1, rotate: -10 },
    exit: { opacity: 0, scale: 0.25, rotate: -6 },
  },
  transition: {
    duration: 0.8,
    ease: bezier.backEaseInOut,
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

export const textLineAppear = {
  variants: {
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0 },
  },
  transition: {
    duration: 0.2,
    ease: bezier.principleIn,
  },
};

export const pageTransition = {
  variants: {
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  transition: {
    duration: 1.5,
  },
};

export const conditionalAnimation = (condition: boolean, animateOverride: Variants) =>
  ({
    initial: baseVariants.initial,
    animate: (condition ? animateOverride.animate || baseVariants.animate : baseVariants.initial) as Variant,
    // exit: baseVariants.exit,
  } as Variants);

export const orchestrate = ({ stagger = 0, delay = 0 }) => ({
  variants: {
    animate: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  },
});

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
