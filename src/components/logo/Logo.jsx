import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';

import classNames from 'classnames';

import styles from './Logo.module.scss';

import { baseVariants, textLineAppear } from '../../core/animation';

import LogoLayers from '../logo-layers/LogoLayers';
import animationData from '/src/utils/lottie/logoAnimation.json';

const Logo = ({ className, size, ...props }) => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    window.location.href = 'http://localhost:5173';
  };

  const defaultOptions = {
    loop: false,
    autoplay: startAnimation,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <motion.div
      className={classNames(styles.wrapper, className, {
        [styles.large]: size === 'large',
      })}
      whileHover={size ? {} : { scale: 0.95, rotate: 5, transition: { duration: 0.2 } }}
      onClick={size !== 'large' ? handleClick : null}
      {...baseVariants}
      {...props}
    >
      {size === 'large' ? (
        <Lottie options={defaultOptions} height="100%" width="100%" />
      ) : (
        <motion.div {...baseVariants} {...textLineAppear}>
          <LogoLayers id="on_n" />
          <LogoLayers id="on_o" />
          <LogoLayers id="flash_1" />
          <LogoLayers id="flash_2" />
          <LogoLayers id="banner" />
          <LogoLayers id="time_t" />
          <LogoLayers id="time_i" />
          <LogoLayers id="time_m" />
          <LogoLayers id="time_e" />
          <LogoLayers id="bush_1" />
          <LogoLayers id="bush_2" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Logo;
