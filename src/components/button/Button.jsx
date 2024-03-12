import React from 'react';

import classNames from 'classnames';

import styles from './Button.module.scss';

function Button({ className, disabled, ...props }) {
  return (
    <button
      className={classNames(styles.wrapper, className, {
        [styles.disabled]: disabled,
      })}
      {...props}
    />
  );
}

export default React.memo(Button);
