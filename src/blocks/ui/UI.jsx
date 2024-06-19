import React from 'react';
import { useEffect, useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { useGameStateContext } from '../../provider/GameStateProvider';
import { usePlayerContext } from '../../provider/PlayerProvider';

import { PLAYER_PHASE, TURN_PHASE } from '../../utils/constants';

import { myPlayer, getState } from 'playroomkit';

import classNames from 'classnames';
import Button from '../../components/button/Button';
import styles from './UI.module.scss';

import EventPanel from '../event-panel/EventPanel';
import Cards from '../../components/cards/Cards';
import Message from '../message/Message';
import Feedback from '../feedback/Feedback';

import { useMessageContext } from '../../provider/MessageProvider';
import StrokeText from '../../components/stroke-text/StrokeText';
import EventRecap from '../event-recap/EventRecap';
import AudioManager from '../audio-manager/AudioManager';
import Drawers from '../../components/drawers/Drawers';
import Timer from '../timer/Timer';
import Scoreboard from '../../components/scoreboard/Scoreboard';

function UI({ className, ...props }) {
  const { playerTurn, players, inGamePlayers, distributeCard } = usePlayerContext();
  const { playerPhase, setPlayerPhase, turnPhase, timer } = useGameStateContext();
  const { message, setMessage } = useMessageContext();
  const [cardsDisabled, setCardsDisabled] = useState(true);
  const [drawersDisabled, setDrawersDisabled] = useState(true);
  const [bin, setBin] = useState(false);

  const currentPlayer = players[playerTurn];
  const me = myPlayer();

  // manage disabled states according to the playerPhase
  useEffect(() => {
    switch (playerPhase) {
      case PLAYER_PHASE.drawCards:
        if (currentPlayer?.id === me?.id && currentPlayer?.getState('cards')?.length < 4) {
          setCardsDisabled(true);
          setDrawersDisabled(false);
          setMessage({ type: 'info', text: 'Au tour de ' + currentPlayer.state.name });
        }
        break;

      case PLAYER_PHASE.performFirst:
        if (currentPlayer?.id === me?.id) {
          setCardsDisabled(false);
          setDrawersDisabled(true);
        }
        break;

      case PLAYER_PHASE.firstResult:
        setCardsDisabled(true);
        setDrawersDisabled(true);
        setBin(false);
        setTimeout(() => {
          setPlayerPhase(PLAYER_PHASE.performLast, true);
        }, 1000);
        break;

      case PLAYER_PHASE.performLast:
        if (currentPlayer?.id === me?.id) {
          setCardsDisabled(false);
          setDrawersDisabled(true);
        }
        break;

      case PLAYER_PHASE.lastResult:
        setCardsDisabled(true);
        setDrawersDisabled(true);
        setBin(false);
        setTimeout(() => {
          setPlayerPhase(null, true);
          currentPlayer.setState('selectedCard', null, true);
          currentPlayer.setState('target', null, true);
          currentPlayer.setState('availableTargets', [], true);
        }, 1000);
        break;

      case null:
        setCardsDisabled(true);
        setDrawersDisabled(true);
        setBin(false);

      default:
        setCardsDisabled(true);
        setDrawersDisabled(true);
        setBin(false);
    }
  }, [getState('playerPhase')]);

  return (
    <>
      <div className={classNames(styles.wrapper, className)} {...props}>
        <div className={styles.topCenterZone}>
          <Timer />
          <Message />
          <EventPanel />
        </div>

        <AnimatePresence>
          {message?.type === 'action' &&
            (getState('playerPhase') === PLAYER_PHASE.firstResult ||
              getState('playerPhase') === PLAYER_PHASE.lastResult) && <Feedback />}
        </AnimatePresence>

        {currentPlayer?.id === me?.id && <p>C'est mon tour !!</p>}
        <p>Je suis {me?.state.name}</p>
        <Scoreboard players={inGamePlayers} />

        <Cards cardsDisabled={cardsDisabled} />
        <div className={styles.middle} />

        <AnimatePresence>{!drawersDisabled && <Drawers drawersDisabled={drawersDisabled} />}</AnimatePresence>
      </div>
    </>
  );
}

export default React.memo(UI);
