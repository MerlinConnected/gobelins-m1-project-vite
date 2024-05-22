import React, { useMemo } from 'react';
import CardLayers from '../card-layers/CardLayers';

import classNames from 'classnames';

import styles from './ImpactIndicator.module.scss';
import StrokeText from '../stroke-text/StrokeText';

function ImpactIndicator({ className, impact, ...props }) {
  const indicator = useMemo(() => {
    let el = { color: null, pattern: null };

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
        <StrokeText medium>{impact}</StrokeText>
      </div>
    </div>
  );
}

export default React.memo(ImpactIndicator);
