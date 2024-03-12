import React from 'react';

import classNames from 'classnames';

import styles from './Button.module.scss';

function Button({ className, disable = false, ...props }) {
  return (
    <button
      className={classNames(styles.wrapper, className, {
        [styles.disabled]: disable,
      })}
      {...props}
    />
  );
}

export default React.memo(Button);
