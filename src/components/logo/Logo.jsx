import classNames from 'classnames';

import styles from './Logo.module.scss';
import LogoLayers from '../logo-layers/LogoLayers';

const Logo = ({ className, size, ...props }) => {
  return (
    <div
      className={classNames(styles.wrapper, className, {
        [styles.large]: size === 'large',
      })}
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
    </div>
  );
};

export default Logo;
