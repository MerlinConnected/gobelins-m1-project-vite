import React from 'react';
import { useEffect, useState } from 'react';

import { AnimatePresence } from "framer-motion";

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

function UI({ className, ...props }) {
  const { playerTurn, players, inGamePlayers, distributeCard } = usePlayerContext();
  const { playerPhase, setPlayerPhase, turnPhase, timer } = useGameStateContext();
  const { setMessage } = useMessageContext();
  const { message } = useMessageContext();
  const [cardsDisabled, setCardsDisabled] = useState(true);
  const [drawersDisabled, setDrawersDisabled] = useState(true);
  const [bin, setBin] = useState(false);

  const currentPlayer = players[playerTurn];
  const me = myPlayer();

  const handleDrawer = (type) => {
    if (currentPlayer?.id !== me?.id || getState('playerPhase') !== PLAYER_PHASE.drawCards) return;
    if (currentPlayer?.getState('cards')?.length < 4) {
      distributeCard(type, currentPlayer);
    }

    if (currentPlayer?.getState('cards')?.length == 4) {
      setPlayerPhase('performFirst', true);
    }
  };

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
          <Message />
          <EventPanel />
        </div>

        <AnimatePresence>
          {(message.type === 'action' && (getState('playerPhase') === PLAYER_PHASE.firstResult || getState('playerPhase') === PLAYER_PHASE.lastResult)) && <Feedback />}
        </AnimatePresence>

        {currentPlayer?.id === me?.id && <p>C'est mon tour !!</p>}
        {turnPhase === TURN_PHASE.playTurn && <p className={styles.timer}>{timer}</p>}
        <p>Je suis {me?.state.name}</p>
        <div className={styles.board}>
          {players.map((player, index) => (
            <div key={index} className={styles.board__player}>
              <p>{player?.state.name}</p>
              <p>{player.getState('points')} points</p>
            </div>
          ))}
        </div>

        <Cards cardsDisabled={cardsDisabled} />

        <div className={styles.drawers}>
          <Button
            disabled={drawersDisabled}
            className={drawersDisabled ? 'disabled' : ''}
            onClick={() => {
              handleDrawer('transport');
            }}
          >
            Piocher carte Transport
          </Button>
          <Button
            disabled={drawersDisabled}
            className={drawersDisabled ? 'disabled' : ''}
            onClick={() => {
              handleDrawer('action');
            }}
          >
            Piocher carte Action
          </Button>
        </div>
      </div>
    </>
  );
}

export default React.memo(UI);
