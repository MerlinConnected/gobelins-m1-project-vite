import React, { useMemo } from 'react';

import classNames from 'classnames';

import styles from './PlayerEyes.module.scss';

const PlayerEyes = ({ className, id, ...props }) => {
  const eyesId = useMemo(() => {
    if (id === 0) {
      return 'eyes1';
    } else if (id === 1) {
      return 'eyes2';
    } else if (id === 2) {
      return 'eyes3';
    } else if (id === 3) {
      return 'eyes4';
    }
  }, [id]);

  const renderSvg = (type) => {
    const svgPath = `/images/profiles/eyes/${id + 1}/${type}.svg`;
    return <img src={svgPath} alt={`${type}`} className={styles[type]} />;
  };

  return (
    eyesId && (
      <div className={classNames(styles.wrapper, className)} {...props}>
        {renderSvg('background')}
        {renderSvg('left-eye')}
        {renderSvg('right-eye')}
        {renderSvg('border')}
      </div>
    )
  );
};

export default React.memo(PlayerEyes);
