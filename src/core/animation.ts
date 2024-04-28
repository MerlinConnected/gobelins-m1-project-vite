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
  ease: bezier.quadEaseOut,
  // opacity: { duration: 0.5, ease: 'linear' },
};

export const cardAppear = {
  variants: {
    initial: { opacity: 0, y: '10%' },
    animate: { opacity: 1, y: '0%' },
    exit: { opacity: 0, y: '-10%' },
  },
};

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
