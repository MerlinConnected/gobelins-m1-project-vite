import React, { useMemo } from 'react';
import classNames from 'classnames';
import styles from './PlayerEyes.module.scss';

const PlayerEyes = ({ className, id, ...props }) => {
  const isValidId = id >= 0 && id <= 3;

  const svgPaths = useMemo(() => {
    if (!isValidId) return {};

    return {
      background: `/images/profiles/eyes/${id + 1}/background.svg`,
      leftEye: `/images/profiles/eyes/${id + 1}/left-eye.svg`,
      rightEye: `/images/profiles/eyes/${id + 1}/right-eye.svg`,
      border: `/images/profiles/eyes/${id + 1}/border.svg`,
    };
  }, [id, isValidId]);

  const renderSvg = (type) => <img src={svgPaths[type]} alt={type} className={styles[type]} />;

  return (
    isValidId && (
      <div className={classNames(styles.wrapper, className)} {...props}>
        {renderSvg('background')}
        {renderSvg('leftEye')}
        {renderSvg('rightEye')}
        {renderSvg('border')}
      </div>
    )
  );
};

export default React.memo(PlayerEyes);
