import classNames from 'classnames';

import styles from './TransportTag.module.scss';
import CardLayers from '../card-layers/CardLayers';

import { CATEGORY } from '../../utils/constants';

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

function TransportTag({ className, transport, ...props }) {
  const key = getKeyByValue(CATEGORY, transport);

  const link = `/images/categories/${key}.svg`;

  return (
    <div
      className={classNames(styles.wrapper, className)}
      style={{ '--tag-background': `var(--color-background-category-${key})` }}
      {...props}
    >
      <div className={styles.main}>
        <div className={styles.wrapperTagPattern}>
          <img src={link} className={styles.tagPattern} />
        </div>
      </div>
      <div className={styles.transportText}>
        <span className={styles.text}>{transport}</span>
      </div>
      <CardLayers className={styles.border} id="tag_outer" />
    </div>
  );
}

export default TransportTag;
