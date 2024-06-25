import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './SwitchImage.module.scss';
import { useHover } from '../../provider/HoverProvider';

const SwitchImage = ({ className, link1, link2, ...props }) => {
  const isHovered = useHover();
  const [currentLink, setCurrentLink] = useState(isHovered ? link1 : link2);

  useEffect(() => {
    if (isHovered) {
      const intervalId = setInterval(() => {
        setCurrentLink((prev) => (prev === link1 ? link2 : link1));
      }, 200);
      return () => clearInterval(intervalId); // Cleanup on unmount
    } else {
      setCurrentLink(link2);
    }
  }, [isHovered, link1, link2]);

  return (
    <div
      className={classNames(styles.wrapper, className, {
        [styles.isHovered]: isHovered,
      })}
      {...props}
    >
      <img src={currentLink} className={styles.image} />
    </div>
  );
};

export default React.memo(SwitchImage);
