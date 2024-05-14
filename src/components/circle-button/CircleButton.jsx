import React from 'react';

import classNames from 'classnames';

import styles from './CircleButton.module.scss';
import CardLayers from '../card-layers/CardLayers';

function CircleButton({ className, disabled, icon, color, ...props }) {
  return (
    <button
      className={classNames(styles.wrapper, className, {
        [styles.disabled]: disabled,
      })}
      {...props}
    >
      <img src="/images/ui/circle-button-bg-white.png" alt="" className={styles.bg} />

      <div className={styles.layerWrapper} style={{ backgroundColor: color }}>
        <CardLayers className={styles.layer} id="pattern_nbr" />
      </div>

      {
        icon && (icon === 'bin' ?
          <img src="/images/ui/bin.png" alt="" className={styles.icon} />
          : <img src="/images/ui/replay.png" alt="" className={styles.icon} />
        )
      }
    </button>
  );
}

export default React.memo(CircleButton);
