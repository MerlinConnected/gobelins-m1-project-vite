import React from 'react';

import classNames from 'classnames';

import styles from './Button.module.scss';

function Button({ className, disable, ...props }) {
  return (
    <button
      className={classNames(styles.button, className, {
        [styles.disabled]: disable,
      })}
      {...props}
    />
  );
}

export default React.memo(Button);
