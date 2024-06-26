import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import styles from './PlayerEyes.module.scss';

const PlayerEyes = ({ className, id, ...props }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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

  const calculateEyePosition = () => {
    const maxOffset = 10;
    const offsetX = (mousePos.x / window.innerWidth) * maxOffset * 2 - maxOffset;
    const offsetY = (mousePos.y / window.innerHeight) * maxOffset * 2 - maxOffset;

    return {
      transform: `translate(calc(${offsetX}px - 50%), calc(${offsetY}px - 50%))`,
    };
  };

  const renderSvg = (type, eyeType) => (
    <img src={svgPaths[type]} alt={type} className={styles[type]} style={eyeType ? calculateEyePosition() : {}} />
  );

  return (
    isValidId && (
      <div className={classNames(styles.wrapper, className)} {...props}>
        {renderSvg('background')}
        {renderSvg('leftEye', 'leftEye')}
        {renderSvg('rightEye', 'rightEye')}
        {renderSvg('border')}
      </div>
    )
  );
};

export default React.memo(PlayerEyes);
