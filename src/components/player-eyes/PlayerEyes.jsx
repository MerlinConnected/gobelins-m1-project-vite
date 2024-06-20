import classNames from 'classnames';

import styles from './PlayerEyes.module.scss';

const PlayerEyes = ({ className, ...props }) => {
  return (
    <div className={classNames(styles.wrapper, className)} {...props}>
      {/* <div />
      <div />
      <div /> */}
    </div>
  );
};

export default PlayerEyes;
