import React, { useRef, useEffect, useState, useMemo } from 'react';

import { Html, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { myPlayer, usePlayerState, getState } from 'playroomkit';

import Path from '../../utils/paths';

import Vehicule from '../../models/vehicules/Vehicule';

import { usePlayerContext } from '../../provider/PlayerProvider';
import { useCardContext } from '../../provider/CardProvider';
import { TURN_PHASE } from '../../utils/constants';
import playSound from '../../utils/playSound';
import { useAudioContext } from '../../provider/AudioProvider';
import { useGameStateContext } from '../../provider/GameStateProvider';
import { useMessageContext } from '../../provider/MessageProvider';
import CameraPositions from '../../utils/cameraPositions';

function Player({ player, index, className, ...props }) {
  const { playerTurn, players } = usePlayerContext();
  const { handlePlayerPhase } = useGameStateContext();
  const { cardsDisabled } = useCardContext();
  const { audioEnabled } = useAudioContext();
  const { setMessage } = useMessageContext();

  const currentPlayer = players[playerTurn];

  const { rotationY, position } = props;
  const me = myPlayer();
  const { id, state } = player;
  const ref = useRef(null);
  const camRef = useRef(null);
  const [currentPoint, setCurrentPoint] = useState(0);
  const [points, setPoints] = usePlayerState(player, 'points');
  const [isAnimating, setIsAnimating] = useState(false);
  const [opacityDown, setOpacityDown] = useState(false);
  const isSelecting = currentPlayer?.getState('isSelecting');

  const [targetable, setTargetable] = useState(false);
  const selectedCard = currentPlayer?.getState('selectedCard');
  const availableTargets = currentPlayer?.getState('availableTargets');

  useEffect(() => {
    const selectable = (currentPlayer?.getState('isSelecting') && currentPlayer?.id === me?.id && !targetable);
    setOpacityDown(selectable);

  }, [targetable, currentPlayer?.getState('isSelecting')]);

  const selectTarget = (event, player) => {
    event.stopPropagation();

    if (currentPlayer?.id !== me?.id || cardsDisabled || getState('turnPhase') !== TURN_PHASE.playTurn) return;
    playSound('ui2.mp3', audioEnabled);
    currentPlayer.setState('target', player, true);
    const cards = currentPlayer.getState('cards');
    const selectedCard = currentPlayer.getState('selectedCard');

    if (selectedCard && selectedCard.type === 'action') {

      if (selectedCard.name === 'pied') {
        setMessage({
          type: 'action',
          text:
            currentPlayer?.getState('target').state.name +
            ' descend !',
        });
      } else if (selectedCard.name === 'moins1' || selectedCard.name === 'moins2') {
        setMessage({
          type: 'action',
          text:
            currentPlayer?.getState('target').state.name +
            ' recule !',
        });
      }

      // remove the selected card from the deck
      cards.splice(
        cards.findIndex((card) => card.uuid === selectedCard.uuid),
        1
      );
      currentPlayer.setState('cards', cards, true);
    }

    handlePlayerPhase();
  };

  useEffect(() => {
    if (currentPlayer === me && selectedCard) {
      const isTargetable = selectedCard?.type === 'action' && availableTargets.some(target => target.id === player.id);

      // const isTargetable = selectedCard?.type === 'action' && currentPlayer?.getState('availableTargets')?.includes(player);

      if (isTargetable && isSelecting) {
        setTargetable(true);
      } else {
        setTargetable(false);
      }
    } else {
      setTargetable(false);
    }

  }, [availableTargets, selectedCard, isSelecting]);

  const cameraPos = useMemo(() => {
    const pos = new THREE.Vector3(position[0], position[1], position[2]);
    return pos;
  }, [player]);

  const path = useMemo(() => Path[index], [index]);
  const cameraPosition = useMemo(() => CameraPositions[index], [index]);

  useFrame(() => {
    if (!isAnimating && points !== currentPoint) {
      // Start the movement process
      movePlayerOneStep();
    }
  });

  const movePlayerOneStep = () => {
    setIsAnimating(true);
    const direction = points > currentPoint ? 1 : -1;
    const nextPoint = currentPoint + direction;
    const startPosition = ref.current.position.clone();
    const endPosition = path[nextPoint]?.clone();

    const duration = 300; // Duration in ms for each step
    let startTime = null;

    const animateStep = (time) => {
      if (!startTime) startTime = time;
      const elapsedTime = time - startTime;
      const progress = elapsedTime / duration;

      if (progress < 1) {
        const currentPos = new THREE.Vector3().lerpVectors(startPosition, endPosition, progress);
        ref.current.position.copy(currentPos);
        requestAnimationFrame(animateStep);
      } else {
        ref.current.position.copy(endPosition);
        setCurrentPoint(nextPoint);
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animateStep);
  };

  return (
    player && (
      <>
        <group
          ref={ref}
          position={path[0]}
          rotation-y={rotationY}
          scale={2}
          {...props}
          onClick={(event) => selectTarget(event, player)}
        >

          <Vehicule player={player} targetable={targetable} opacityDown={opacityDown} />
        </group>
        {me?.id === player.id && <PerspectiveCamera ref={camRef} position={cameraPosition} makeDefault fov={34} />}
        {me?.id === player.id && (
          <mesh position={position}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="red" />
          </mesh>
        )}

      </>
    )
  );
}

export default Player;
