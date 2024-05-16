import React from 'react';

import classNames from 'classnames';

import styles from './CircleButton.module.scss';
import CardLayers from '../card-layers/CardLayers';

function CircleButton({ className, large, icon, color, ...props }) {

  const iconUrl = `/images/icons/buttons/${icon}.svg`;

  return (
    <button
      className={classNames(styles.wrapper, className, {
        [styles.large]: large,
      })}
      {...props}
    >
      <img src="/images/ui/circle-button-bg-white.png" className={styles.bg} />

      <div className={styles.layerWrapper} style={{ backgroundColor: color }}>
        <CardLayers className={styles.layer} id="pattern_nbr" />
      </div>

      {
        icon && (
          <img src={iconUrl} alt="" className={styles.icon} />
        )
      }

    </button>
  );
}

export default React.memo(CircleButton);
