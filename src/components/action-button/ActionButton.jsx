import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import classNames from 'classnames';

import styles from './ActionButton.module.scss';

import CardLayers from '../card-layers/CardLayers';
import StrokeText from '../stroke-text/StrokeText';

const LAYER_PATTERN = 20;
const LAYER_TEXT = 50;

const ActionButton = ({ className, color, pattern, text, size, children, ...props }) => {
  const { headText, subText, gigaColor } = props;

  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(x, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = mouseX / width - 0.5;
    const rY = mouseY / height - 0.5;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const style = (layer) => {
    return {
      transform: `translateZ(${layer}px)`,
      transformStyle: 'preserve-3d',
    };
  };

  return (
    <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}>
      <motion.div
        ref={ref}
        className={classNames(styles.wrapper, className, {
          [styles.medium]: size === 'medium',
          [styles.large]: size === 'large',
          [styles.xlarge]: size === 'xlarge',
          [styles.giga]: size === 'giga',
        })}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', '--btn-bg-color': color }}
        {...props}
      >
        <div className={styles.background} />
        <motion.div style={style(LAYER_PATTERN)} className={styles.layerWrapper}>
          <CardLayers className={styles.layer} id={pattern} fill="black" />
        </motion.div>

        {size === 'giga' ? (
          <div
            className={styles.gigaWrapper}
            style={{
              '--headText-color': `var(--color-button-${gigaColor})`,
              '--subText-color': `var(--color-button-${gigaColor}-dark)`,
            }}
          >
            <StrokeText className={styles.text}>{headText}</StrokeText>
            <StrokeText className={styles.text}>{subText}</StrokeText>
          </div>
        ) : (
          <StrokeText style={style(LAYER_TEXT)} className={styles.text}>
            {text}
          </StrokeText>
        )}

        {children && <div className={styles.children}>{children}</div>}
      </motion.div>
    </motion.div>
  );
};

export default React.memo(ActionButton);
