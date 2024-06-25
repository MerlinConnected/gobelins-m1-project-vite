import React, { useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

import styles from './Drawers.module.scss';

import Drawer from '../drawer/Drawer';
import StrokeText from '../stroke-text/StrokeText';

function Drawers({ className, drawersDisabled, ...props }) {
  const [drawnCardTypes, setDrawnCardTypes] = useState([]);

  const handleDrawnCards = (type) => {
    setDrawnCardTypes((prevTypes) => [...prevTypes, type]);
  };

  const getColor = (index) => {
    if (index < drawnCardTypes.length) {
      return drawnCardTypes[index] === 'transport'
        ? 'var(--color-drawer-light-transport)'
        : 'var(--color-drawer-light-action)';
    }
    return 'none';
  };

  return (
    !drawersDisabled && (
      <motion.div
        key="drawers"
        className={classNames(styles.wrapper, className)}
        {...props}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
      >
        <div className={styles.drawersHelper}>
          <StrokeText medium>Choisis bien tes cartes</StrokeText>
          <div className={styles.checkpoints}>
            {Array.from({ length: 2 }).map((_, index) => (
              <svg
                key={index}
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.0073 3L33 12.555L31.087 26.6367L21.5203 33L8.97071 32.0214L3 20.4674L6.78748 9.12243L12.5274 3H24.0073Z"
                  fill={getColor(index)}
                  stroke="white"
                  strokeWidth="4.5"
                />
              </svg>
            ))}
          </div>
        </div>
        <div className={styles.drawers}>
          <Drawer type="transport" handleDrawnCards={() => handleDrawnCards('transport')} />
          <Drawer type="action" handleDrawnCards={() => handleDrawnCards('action')} />
        </div>
      </motion.div>
    )
  );
}

export default React.memo(Drawers);
