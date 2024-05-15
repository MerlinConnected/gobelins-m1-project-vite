import React from 'react';

import classNames from 'classnames';

import styles from './StrokeText.module.scss';

function StrokeText({ className, color, regular, medium, large, children, ...props }) {
  return (
    <p className={classNames(styles.wrapper, className)} style={{ color: color }} {...props}>
      {children}
    </p>
  );
}

export default React.memo(StrokeText);
