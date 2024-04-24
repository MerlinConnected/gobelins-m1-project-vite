import React from 'react';

import classNames from 'classnames';

import styles from './SpeedIndicator.module.scss';
import CardLayers from '../card-layers/CardLayers';
import { useEffect } from 'react';

function SpeedIndicator({ className, impact, ...props }) {
  const mainColorRef = React.useRef([]);

  useEffect(() => {
    if (mainColorRef.current) {
      // add the var(--color-background-transport-main-${impact}) to change the color of the arrow

      mainColorRef.current.forEach((element) => {
        element.style.setProperty(
          '--color-background-transport-main',
          `var(--color-background-transport-main-${impact})`
        );
      });
    }
  }, []);

  return (
    impact - 1 > 0 && (
      <div className={classNames(styles.wrapper, className)} {...props}>
        {Array.from({ length: impact }, (_, index) => (
          <div key={index} ref={(el) => (mainColorRef.current[index] = el)} className={styles.main}>
            <div className={styles.wrapperLayer}>
              <CardLayers className={styles.layer} id="pattern_nbr" />
            </div>
            <CardLayers className={styles.arrow} id="arrow" />
          </div>
        ))}
      </div>
    )
  );
}

export default SpeedIndicator;
