import React from 'react';
import { useEffect, useState } from 'react';

import { useGameStateContext } from '../../provider/GameStateProvider';
import { usePlayerContext } from '../../provider/PlayerProvider';

import { PLAYER_PHASE, TURN_PHASE } from '../../utils/constants';

import { myPlayer, getState } from 'playroomkit';

import classNames from 'classnames';
import Button from '../../components/button/Button';
import styles from './UI.module.scss';

import { Toaster, toast } from 'sonner';
import EventPanel from '../event-panel/EventPanel';

function UI({ className, ...props }) {
  const { playerTurn, players, distributeCard } = usePlayerContext();
  const { playerPhase, setPlayerPhase, turnPhase, timer, toastMessage, setToastMessage } = useGameStateContext();
  const [cardsDisabled, setCardsDisabled] = useState(true);
  const [drawersDisabled, setDrawersDisabled] = useState(true);
  const [bin, setBin] = useState(false);

  const currentPlayer = players[playerTurn];
  const me = myPlayer();

  const selectCard = (card) => {
    if (currentPlayer?.id !== me?.id) return;
    currentPlayer.setState('selectedCard', card, true);

    switch (card.type) {
      case 'action':
        const cardCategories = card.category;
        console.log('cardCategories', cardCategories);

        const otherPlayers = players.filter((p) => p.id !== currentPlayer.id);
        const currentTargets = otherPlayers.filter(player =>
          player.getState('status').category.some(cat => cardCategories.includes(cat))
        );
        currentPlayer.setState(
          'availableTargets',
          currentTargets,
          true
        );
        break;
      case 'transport':
        currentPlayer.setState(
          'availableTargets',
          [currentPlayer],
          true
        );
        break;
      default:
        break;
    }

    setBin(true);

    console.log('availableTargets', currentPlayer.getState('availableTargets'));
  };

  const handleDrawer = (type) => {
    if ((currentPlayer?.id !== me?.id) || getState('playerPhase') !== PLAYER_PHASE.drawCards) return;
    if (currentPlayer?.getState('cards')?.length < 4) {
      distributeCard(type, currentPlayer);
    }

    if (currentPlayer?.getState('cards')?.length == 4) {
      setPlayerPhase('performFirst', true);
    }
  };

  const selectTarget = (player) => {
    if ((currentPlayer?.id !== me?.id) || cardsDisabled || getState('turnPhase') !== TURN_PHASE.playTurn) return;
    currentPlayer.setState('target', player, true);
    const cards = currentPlayer.getState('cards');
    const selectedCard = currentPlayer.getState('selectedCard');
    const decisions = currentPlayer.getState('decisions');
    decisions.push({ card: selectedCard, target: player });
    currentPlayer.setState('decisions', decisions, true);

    if (selectedCard) {

      switch (selectedCard.type) {
        case 'transport':
          setToastMessage(currentPlayer?.state.name + ' décide de prendre le ' + selectedCard.name + ' !');
          break;

        case 'action':
          if (selectedCard.name === 'pied') {
            setToastMessage(currentPlayer?.getState('target').state.name + ' retourne à pied à cause de ' + currentPlayer?.state.name + ' !');
          } else if (selectedCard.name === 'moins') {
            setToastMessage(currentPlayer?.getState('target').state.name + ' recule de ' + selectedCard.name + '  à cause de ' + currentPlayer?.state.name + ' !');
          }

        default:
          break;
      }

      // remove the selected card from the deck
      cards.splice(
        cards.findIndex((card) => card.id === selectedCard.id),
        1
      );
      currentPlayer.setState('cards', cards, true);
    }

    // change playerPhase
    switch (playerPhase) {
      case PLAYER_PHASE.performFirst:
        setPlayerPhase(PLAYER_PHASE.firstResult, true);
        break;

      case PLAYER_PHASE.performLast:
        setPlayerPhase(PLAYER_PHASE.lastResult, true);
        break;

      default:
        break;
    }

    setBin(false);
  };

  useEffect(() => {
    if (!toastMessage) return;
    toast(toastMessage, {
      position: 'top-center',
    });
  }, [toastMessage]);

  const deleteCard = (card) => {
    if ((currentPlayer?.id !== me?.id) || cardsDisabled) return;
    console.log('deleteCard');
    const cards = currentPlayer.getState('cards');
    cards.splice(
      cards.findIndex((c) => c.id === card.id),
      1
    );
    currentPlayer.setState('cards', cards, true);
    setBin(false);

    // change playerPhase
    switch (playerPhase) {
      case PLAYER_PHASE.performFirst:
        setPlayerPhase(PLAYER_PHASE.firstResult, true);
        break;

      case PLAYER_PHASE.performLast:
        setPlayerPhase(PLAYER_PHASE.lastResult, true);
        break;

      default:
        break;
    }

    setToastMessage(currentPlayer?.state.name + ' a défaussé la carte ' + currentPlayer?.getState('selectedCard').name);
  };

  // manage disabled states according to the playerPhase
  useEffect(() => {
    switch (playerPhase) {
      case PLAYER_PHASE.drawCards:
        if (currentPlayer?.id === me?.id && currentPlayer?.getState('cards')?.length < 4) {
          setCardsDisabled(true);
          setDrawersDisabled(false);
          setToastMessage('Au tour de ' + currentPlayer.state.name);
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

    console.log('playerPhase', playerPhase);
  }, [getState('playerPhase')]);

  return (
    <>
      <div className={classNames(styles.wrapper, className)} {...props}>
        <Toaster />
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

        <EventPanel />

        <div className={styles.deck}>
          {me.getState('cards')?.map((card, index) => (
            <Button
              disabled={cardsDisabled}
              className={cardsDisabled ? 'disabled' : ''}
              onClick={() => {
                selectCard(card);
              }}
              key={index}
            >
              {card.id} {card.type} {card.name}
            </Button>
          ))}
        </div>

        <div className={styles.targets}>
          {currentPlayer === me &&
            currentPlayer.getState('availableTargets')?.map((player, index) => (
              <Button
                key={index}
                disabled={cardsDisabled}
                className={cardsDisabled ? 'disabled' : ''}
                onClick={() => {
                  selectTarget(player);
                }}
              >
                <span>{player?.id === me.id ? 'Changer' : player?.state.name}</span>
              </Button>
            ))}
          {bin &&
            <Button
              className={styles.remove}
              onClick={() => {
                deleteCard(currentPlayer?.getState('selectedCard'));
              }}
            >
              <span>Jeter</span>
            </Button>
          }
        </div>

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
