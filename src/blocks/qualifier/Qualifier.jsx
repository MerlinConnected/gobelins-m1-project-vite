import { motion, AnimatePresence } from 'framer-motion';

import styles from './Qualifier.module.scss';
import classNames from 'classnames';

// import VehiculeIcons from '../../components/vehicle-icons/VehicleIcons';
import StrokeText from '../../components/stroke-text/StrokeText';

import { useGameStateContext } from '../../provider/GameStateProvider';
import { usePlayerContext } from '../../provider/PlayerProvider';
import { useMemo } from 'react';
import { GAME_PHASE, TURN_PHASE } from '../../utils/constants';
import { useEffect, useState } from 'react';

function Qualifier() {
  const { getFinishersList } = useGameStateContext();
  const { players } = usePlayerContext();

  const finishers = useMemo(() => getFinishersList(), [getFinishersList]);

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [finishers]);

  const animationVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.5 } },
  };

  return (
    <AnimatePresence>
      {finishers.map(
        (finisher, index) =>
          visible && (
            <motion.div
              key={finisher.id}
              className={classNames(styles.wrapper)}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={animationVariants}
            >
              <div className={classNames(styles.qualifier)}>
                <div>
                  <p>Arrivée de</p>
                  <StrokeText color="#00C4EF" className={styles.strokeText}>
                    {finisher.sname}
                  </StrokeText>
                  <p>
                    Il ne reste plus que <span>{finishers.length}</span> places
                  </p>
                </div>
                {/* <VehiculeIcons player={finisher} /> */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 998 493">
                  <path id="reuse-0" fill="#A3E0EC" d="m554 203-22-15-2 10-33 35 72 26-15-56Z" />
                  <path
                    fill="#9ADCEA"
                    d="M642 60h1l2-2 3-3 14-9 3-2 11-4 1-1 12-5h2v-1h9l17-1 25-2h1l25-2h12l29-2h1l31-2h1l10-1h8l6-1h6l10-1h8l4-1h1l58-3 8 13 3 5 11 18v7l1 10v13l1 35 2 70v4l-3 2-6 3-3 1-3 2h-2l-3 2-16 8-1 10v1l-1 15v1l-2 15-2 25 38 19 1 10v8l1 13v15l2 35v6l1 6v13l1 6v17l1 9-7 7-14 16-8 9h-26l-84 1h-51l-2 1h-98l-7-2-1-1-22-9-19-13-4 2v1l-16 10h-2l-1 1-48 1h-12l-25 1h-2l-23 1h-1l-52 2h-11l-23 1-45 1h-1l-13 1-76 3h-10l-26 1h-10l-26 1h-15l-13 1h-21l-5 1h-27l-12 1h-6l-11 1H85l-5 1H54l-18-10-5-3-3-35v-1l-5-48v-1l-2-23-3-31 22-2h1l5-1h4l6-1v-6l1-20v-1l1-40v-17l-25-10h-1l-3-1-3-1v-67l-1-49V62l1-1 2-3 12-18h168l7 1h39l68 1h119l60 1h67l22 1h34l14 10 5 4-1 2Z"
                  />
                  <path
                    fill="#A3E0EC"
                    d="M58 237v-1l-26-10-4-1-2-1v-7h85l-54 36 1-15v-1ZM20 355l-3-31 22-2h1l6-1 18 53-44-19ZM717 32l-10 12-26 34-16-34 11-4h1l12-5 2-1h1l8-1 17-1ZM852 23l-6 37-37-34h1l31-2h1l10-1ZM554 203l-22-15-2 10-33 35 72 26-15-56Z"
                  />
                  <path
                    fill="#A3E0EC"
                    d="m624 42-33-1h-91l-1 47-2 73-74-51 4 28v1l7 53-32-39-25-30-20-25 55-53-5-5h-59l-24-1h-90l-9 17-20 35-24 45-17 30-15-50-16-50 26-25 3-3H84l-39-1h-6L27 56l31 9 39 41 63 67-8 16-10 18 35-25 28-20 47-33-21 59-12 33-2-5-18 15-100 83 136-3h14l-12 4-14 4v1L33 386l3 81 17 10 15-1h21l11-1h22l12-1h2l24-1h15l-2-2-2-1-33-38 92-88 12 43 15 48v2l-16 34h11l26-1h1l8-1 76-2-5-13-28-76 37-21 30-18 11-6 54-32 5-3 14 3-2 3 35 27 24 18 21 16-89-8-50 40-27 22 30 46 23-1h11l51-2h2l23-1h1l12-15 19 10 6 4 48-2h4l15-11h1l3-3 19 14 22 9h1l7 3h3l38-1h24l1-12 1-17 1-16 10 6 21 13 43 26h9l84-1h27l8-10 14-16 1-5-19-3-94-16 112-28 4-1v-12l-71-47 15-48 17 35 28 13 8 3v-6l-1-13v-18l-39-20 2-25 2-14v-2l1-15v-1l2-10 15-8-7-4 25-80-1-36V58l-1-6v-1l-11-18-2-5-9-14-57 4h-6l-13 67 26 45 36 61-64-32-3-3-27-31-4-6-49-56-49 85"
                  />
                  <path
                    fill="#A3E0EC"
                    d="m884 199 15 32 13 28-16 13-52 42-57 12 19-25 34-45 44-57ZM414 296h-3l-57 7-42 6-50 6 4-4 24-1 19-17 49-44 43-40-102-9-13-1-13-78 49 26 29 15 5 3 79 41 4 29-68 25-38 13 70 14 32 6-21 3ZM750 333l-39 8 26 13-23 40-1 2-17 29-5 7-48-2-75-4h-5l3-5 26-31 8-11 8-9-10-1-11-40-18-70-15-56-22-15-19-13 1-2 58-38 11 33 2 5 36 104 7 22 29-9 108-34 1 20v6l2 47-4 1-14 3ZM853 416l-57-9-36-6 2-34 30 15 2 1 18 10 44 22 5 3-8-2Z"
                  />
                  <path
                    fill="#A3E0EC"
                    d="m554 203-22-15-2 10-33 35 72 26-15-56ZM371 260l-38 13 70 14-32-27ZM414 296h-3l5 1-2-1Z"
                  />
                  <path fill="#A3E0EC" d="m554 203-22-15-2 10-33 35 72 26-15-56ZM299 200l59 49 43-40-102-9Z" />
                  <path fill="#A3E0EC" d="m554 203-22-15-2 10-33 35 72 26-15-56ZM73 110l-48-2v-1l-1-3V73l37 28 12 9Z" />
                  <path fill="#C8ECF4" d="m129 382-39 58 13 30 26-88Z" />
                  <path
                    fill="#C8ECF4"
                    d="m329 420-72 15-58 12-25 24-2 2h-2l2-4 41-90 30 8 29 7-35-78-2-4-15-34-21-46-22-48v-1l-25 8-77 21v10l-4-5-42-55 3 55v9l-4-1-2-1v-7l-1-20v-40l-1-49V94l37 7 36 8 51 10 16 3 17 17 25 25 25 26 74 74 4 29 3 16 17 111ZM568 422v4l-3 29v4h-5l-25 1h-2l-7-34-26-28 66 23 2 1Z"
                  />
                  <path
                    fill="#C8ECF4"
                    d="m979 187-9 8-2 2-4 1-1 1-4 2-16 8-1 10v1l-1 15v1l-2 15-40-21-7-4 5 45 13 121-54 23-3 1-62 26-33 14-23 10-2 3h-39l-51-39-16-13-11-104-29 15-12 7-149-95 37 61 12 20-66 12-13 2 2 4 23 58 25 66-23 1-45 2h-14l-76 3 16-13 55-3 31-1-23-95-13-54-5-21 62 13 5 2-2-2-10-9-33-27-13-11-59-50-2-1h12l13-52 26-104h40l13 1h39l-44 49 58 27 45-28 61-39 1-8h30l33 1 13 9 10 31-152 85 19 3 20 3-2 11-1 11-34 35 72 26 52 18 36 13 36 13-16 2-10 92 29 29 37 37 26-22 11-10 26-23 17-15 50-44-69 35-1 1-1-2-25-101h-1l-6 1 6-7 103-116 3-3 32-26 60-51 12 2 1 36 2 70ZM977 342l-9-12-6-8 15 6v14ZM982 434l-7 7-14 16-3-24-2-13 19-30 4-6 1 5v13l1 7v16l1 9ZM243 134l-38-41-47-50-3-3h44l25 18h1l18 76Z"
                  />
                  <path
                    fill="#C8ECF4"
                    d="m574 173 103 7 17-21-32-31-88 45ZM805 164l46-43h-44l-2 43ZM745 95l2 16-40-67-7-11 17-1 25-2h1l25-1 10 21-33 45ZM114 66 45 39h46l23 27ZM722 266l38-53-51 29 13 24ZM510 337l31 13-17-29-14 16Z"
                  />
                  <path
                    fill="#9ADCEA"
                    d="m426 141-49-15-15-4-11 40-3 10 8-7 22-22 22 14 2-1 24-14 1-1h-1Zm373 140 4 24 3-4 34-39v-32l-41 51Z"
                  />
                  <path
                    fill="#fff"
                    d="m42 247-2 59-40 4 16 163 33 20 580-20 13-10 12 8 35 14 271-2 38-43-8-153-37-19 5-48 37-18-4-153-29-49-274 18-34 13-12 9-13-10-598-6L8 59l2 176 32 12ZM642 60h1l2-2 3-3 14-9 3-2 11-4 1-1 12-5h2v-1h9l17-1 25-2h1l25-2h12l29-2h1l31-2h1l10-1h8l6-1h6l10-1h8l4-1h1l58-3 8 13 3 5 11 18v7l1 10v13l1 35 2 70v4l-3 2-6 3-3 1-3 2h-2l-3 2-16 8-1 10v1l-1 15v1l-2 15-2 25 38 19 1 10v8l1 13v15l2 35v6l1 6v13l1 6v17l1 9-7 7-14 16-8 9h-26l-84 1h-51l-2 1h-98l-7-2-1-1-22-9-19-13-4 2v1l-16 10h-2l-1 1-48 1h-12l-25 1h-2l-23 1h-1l-52 2h-11l-23 1-45 1h-1l-13 1-76 3h-10l-26 1h-10l-26 1h-15l-13 1h-21l-5 1h-27l-12 1h-6l-11 1H85l-5 1H54l-18-10-5-3-3-35v-1l-5-48v-1l-2-23-3-31 22-2h1l5-1h4l6-1v-6l1-20v-1l1-40v-17l-25-10h-1l-3-1-3-1v-67l-1-49V62l1-1 2-3 12-18h168l7 1h39l68 1h119l60 1h67l22 1h34l19 14-1 2Z"
                  />
                  <path
                    fill="#8BD3E4"
                    d="M645 438h-8v-20h8v20Zm0-42h-8v-22h8v22Zm0-44h-8v-22h8v22Zm0-44h-8v-22h8v22Zm0-44h-8v-22h8v22Zm0-44h-8v-22h8v22Zm0-44h-8v-22h8v22Zm0-44h-8v-22h8v22Zm0-44h-8V66h8v22Z"
                  />
                </svg>
              </div>
            </motion.div>
          )
      )}
    </AnimatePresence>
  );
}

export default Qualifier;
