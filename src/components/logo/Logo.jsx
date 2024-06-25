import { motion } from 'framer-motion';

import classNames from 'classnames';

import styles from './Logo.module.scss';
import LogoLayers from '../logo-layers/LogoLayers';

const Logo = ({ className, size, ...props }) => {
  // set a on click function that set the url back to localhost:5173 without opening a new tab

  const handleClick = () => {
    window.location.href = 'http://localhost:5173';
  };

  return (
    <motion.div
      className={classNames(styles.wrapper, className, {
        [styles.large]: size === 'large',
      })}
      whileHover={size ? {} : { scale: 0.95, rotate: 5, transition: { duration: 0.2 } }}
      onClick={size != 'large' ? handleClick : null}
      {...props}
    >
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
  );
};

export default Logo;
