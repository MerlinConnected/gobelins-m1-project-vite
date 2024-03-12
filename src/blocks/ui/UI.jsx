import React from 'react';
import { useEffect, useState } from 'react';

import { usePlayerContext } from '../../provider/PlayerProvider';
import { isHost, myPlayer } from 'playroomkit';
import { Leva, useControls } from 'leva';
import { getState } from 'playroomkit';

import classNames from 'classnames';
import Button from '../../components/button/Button';

import styles from './UI.module.scss';
import { useGameStateContext } from '../../provider/GameStateProvider';

function UI({ className, ...props }) {
  const { playerTurn, players, distributeCard } = usePlayerContext();
  const { playerPhase, setPlayerPhase } = useGameStateContext();
  const [cardsDisabled, setCardsDisabled] = useState(true);
  const [drawersDisabled, setDrawersDisabled] = useState(true);

  const currentPlayer = players[playerTurn];
  const me = myPlayer();

  const selectCard = (type, id) => {
    currentPlayer.setState('selectedCardType', type, true);
    currentPlayer.setState('selectedCardId', id, true);

    if (type === 'action') {
      currentPlayer.setState(
        'availableTargets',
        players.filter((p) => p.id !== currentPlayer.id),
        true
      );
    }
  };

  const handleDrawer = (type) => {
    if (type === 'transport' && currentPlayer?.getState('cards')?.length < 4) {
      distributeCard('transport');
    }
    if (type === 'action' && currentPlayer?.getState('cards')?.length < 4) {
      distributeCard('action');
    }

    if (currentPlayer?.getState('cards')?.length >= 4) {
      setPlayerPhase('performFirst', true);
    }
  };

  const selectTarget = (index) => {
    currentPlayer.setState('target', index, true);
  };

  // manage disabled states according to the playerPhase
  useEffect(() => {
    switch (playerPhase) {
      case 'drawCards':
        if (currentPlayer?.id === me?.id && currentPlayer?.getState('cards')?.length < 4) {
          setCardsDisabled(true);
          setDrawersDisabled(false);
        }
        break;

      case 'performFirst' || 'performLast':
        if (currentPlayer?.id === me?.id) {
          setCardsDisabled(false);
          setDrawersDisabled(true);
        }
        break;

      case 'firstResult' || 'lastResult':
        setCardsDisabled(true);
        setDrawersDisabled(true);
        break;

      default:
        setCardsDisabled(true);
        setDrawersDisabled(true);
    }
  }, [playerPhase]);

  return (
    <>
      <div className={classNames(styles.wrapper, className)} {...props}>
        {currentPlayer?.id === me?.id && <p>C'est mon tour !!</p>}
        <p>Je suis {me.state.profile.name}</p>
        <div className="styles.board">
          <h2>Classement</h2>
          {players.map((player, index) => (
            <div key={index}>
              <p>{player.state.profile.name}</p>
              <p>{player.getState('points')} points</p>
            </div>
          ))}
        </div>

        <div className="deck">
          {me.getState('cards')?.map((card, index) => (
            <Button
              onClick={() => {
                selectCard(card.type, card.id);
              }}
              disabled={cardsDisabled}
              // className={cardsDisabled ? 'disabled' : ''}
              key={index}
            >
              {card.id} {card.type} {card.name}
            </Button>
          ))}
        </div>

        <div className="targets">
          {currentPlayer === me &&
            currentPlayer.getState('availableTargets')?.map((player, index) => (
              <Button
                key={index}
                onClick={() => {
                  selectTarget(index);
                }}
                disabled={cardsDisabled}
                // className={cardsDisabled ? 'disabled' : ''}
              >
                <span>{player.state.profile.name}</span>
              </Button>
            ))}
        </div>

        <div className="drawers">
          <Button
            onClick={() => {
              handleDrawer('transport');
            }}
            disabled={drawersDisabled}
            // className={drawersDisabled ? 'disabled' : ''}
          >
            Piocher carte Transport
          </Button>
          <Button
            onClick={() => {
              handleDrawer('action');
            }}
            disabled={drawersDisabled}
            // className={drawersDisabled ? 'disabled' : ''}
          >
            Piocher carte Action
          </Button>
        </div>
      </div>
    </>
  );
}

export default React.memo(UI);
