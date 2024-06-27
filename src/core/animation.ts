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

export const scaleRotateAnimation = {
  variants: {
    initial: { opacity: 0, scale: 0.5, rotate: -10 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.5, rotate: -10 },
  },
  transition: {
    duration: 0.6,
    ease: bezier.backEaseInOut,
  },
};

export const scaleRotateAnimationInvert = {
  variants: {
    initial: { opacity: 0, scale: 1.8, rotate: -10 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 1.8, rotate: -10 },
  },
  transition: {
    duration: 0.6,
    ease: bezier.backEaseInOut,
  },
};

export const textAppearRotate = {
  variants: {
    initial: { opacity: 0, scale: 0.25, rotate: -6 },
    animate: { opacity: 1, scale: 1, rotate: -10 },
    exit: { opacity: 0, scale: 0.25, rotate: -6 },
  },
  transition: {
    duration: 0.4,
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

export const pageTransitionIn = {
  animate: { opacity: 0, transition: { duration: 1.5 }, ease: bezier.principle },
};

export const pageTransitionExit = {
  variants: {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  transition: {
    duration: 1,
  },
};

export const pageTransition = {
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  transition: {
    duration: 0.5,
  },
};

export const onLogoAnimation = {
  initial: {
    y: -50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      y: {
        duration: 0.3,
        ease: bezier.quadEaseIn,
      },
      opacity: {
        duration: 0.15,
        ease: bezier.principle,
      },
    },
  },
};

export const timeLogoAnimation = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      scale: {
        duration: 0.8,
        ease: bezier.backEaseOut,
      },
      opacity: {
        duration: 0.2,
        ease: bezier.backEaseInOut,
      },
    },
  },
};

export const doubleRotor = {
  variants: {
    initial: { opacity: 0.2, scale: 1.8, rotate: -25 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0, rotate: 25 },
  },
  transition: {
    duration: 0.4,
    ease: [0.43, 0.13, 0.23, 0.96],
  },
};

export const doubleRotorLast = {
  variants: {
    initial: { opacity: 0.2, scale: 2, rotate: -15 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0.2, scale: 0.25, rotate: 25 },
  },
  transition: {
    duration: 0.4,
    ease: bezier.backEaseInOut,
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
