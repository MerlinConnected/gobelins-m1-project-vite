import React, { useMemo } from 'react';
import CardLayers from '../card-layers/CardLayers';

import classNames from 'classnames';

import styles from './ImpactIndicator.module.scss';
import StrokeText from '../stroke-text/StrokeText';

function ImpactIndicator({ className, impact, ...props }) {
  const indicator = useMemo(() => {
    let el = { color: null, pattern: null, impact: impact };

    if (impact > 1) {
      el.color = `var(--color-background-transport-main-${impact})`;
      el.pattern = 'speed_up';
    } else if (impact === 1) {
      el.color = `var(--color-background-action-main-${impact})`;
      el.pattern = 'speed_equal';
    } else if (impact < 0) {
      el.color = `var(--color-background-action-main--minus-${Math.abs(impact)})`;
      el.pattern = 'speed_down';
    }

    return el;
  }, []);

  return (
    <div className={classNames(styles.wrapper, className)} {...props}>
      <div className={styles.main} style={{ '--background': `${indicator.color}` }}>
        <div className={styles.wrapperLayer}>
          <CardLayers className={styles.layer} id="pattern_nbr" />
          <CardLayers className={classNames(styles.layer, styles.indicator)} id={indicator.pattern} />
        </div>
        <CardLayers className={styles.arrow} id="impact_layer" />
      </div>
      <div className={styles.impactText}>
        {indicator.impact === 1 ? (
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 65">
            <path
              d="M31.58 20.95 37.6 15l.22 6.97.02.76.74.13 9.26 1.7-7.77 6.53-.62.53.43.68 7.26 11.65-13.8-8.64-.6-.38-.53.5-10.85 10.3 2.96-12.13.2-.8-.78-.3-12.94-4.8 12.94-1.61 1.26-.16-.53-1.16-5.21-11.3 11.14 7.6.63.43.55-.55Z"
              fill="#100301"
              stroke="#fff"
              strokeWidth="3"
            />
          </svg>
        ) : (
          <StrokeText medium>{impact}</StrokeText>
        )}
      </div>
    </div>
  );
}

export default React.memo(ImpactIndicator);
