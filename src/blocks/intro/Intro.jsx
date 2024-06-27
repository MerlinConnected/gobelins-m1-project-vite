import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Intro.module.scss'; // Assuming you have some CSS for styling
import classNames from 'classnames';
import StrokeText from '../../components/stroke-text/StrokeText';
import {
  baseVariants,
  conditionalAnimation,
  doubleRotor,
  doubleRotorLast,
  pageTransitionExit,
  pageTransitionIn,
} from '../../core/animation';

const sequence = ['3', '2', '1', `Zébardi !`];

const Intro = () => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [startPageTransition, setStartPageTransition] = useState(false);

  useEffect(() => {
    const startAnimation = setTimeout(() => {
      setCurrentStep(0);
    }, 500);

    const startPageTransitionTimer = setTimeout(() => {
      setStartPageTransition(true);
    }, 5000);

    return () => {
      clearTimeout(startAnimation);
      clearTimeout(startPageTransitionTimer);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (currentStep >= 0 && currentStep < sequence.length - 1) {
      interval = setInterval(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentStep]);

  const animationProps = conditionalAnimation(startPageTransition, pageTransitionIn);

  return (
    <motion.div className={classNames(styles.wrapper)} {...baseVariants} {...pageTransitionExit}>
      <motion.div className={styles.background} {...baseVariants} {...animationProps} />
      <motion.div className={styles.content}>
        <AnimatePresence mode="wait">
          {currentStep >= 0 && (
            <motion.span
              layout
              key={sequence[currentStep]}
              {...baseVariants}
              {...(currentStep === sequence.length - 1 ? doubleRotorLast : doubleRotor)}
            >
              <StrokeText>{sequence[currentStep]}</StrokeText>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(Intro);
