import classNames from 'classnames';
import styles from './Scoreboard.module.scss';

function Scoreboard({ className, ...props }) {
  // Logic goes here
  return (
    <div className={classNames(styles.wrapper, className)} {...props}>
      {/* Rendering goes here */}
    </div>
  );
}

export default Scoreboard;
