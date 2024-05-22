import React, { useRef, useEffect, useState, useMemo } from 'react';

import { Html, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { myPlayer, usePlayerState } from 'playroomkit';

import Path from '../../utils/paths';

import { Vehicule } from '../../models/vehicules/Vehicule';

import Billboard from '../../components/billboard/Billboard';
import classNames from 'classnames';
import styles from '../../components/billboard/Billboard.module.scss';

function Player({ player, index, className, ...props }) {
  const { rotationY, position } = props;
  const me = myPlayer();
  const { id } = player;
  const { state } = player;
  const ref = useRef();
  const camRef = useRef();
  const [currentPoint, setCurrentPoint] = useState(0);
  const [points, setPoints] = usePlayerState(player, 'points');
  const [isAnimating, setIsAnimating] = useState(false);

  const cameraPos = useMemo(() => {
    const pos = new THREE.Vector3(position[0], position[1], position[2]);
    return pos;
  }, [player]);

  const path = useMemo(() => Path[index], [index]);

  useEffect(() => {
    if (me?.id === id) {
      // set the camera pos next to the player
      camRef.current.position.copy(cameraPos);

      let tempVec = new THREE.Vector3();

      ref.current.getWorldDirection(tempVec);

      camRef.current.position.addScaledVector(tempVec, -20);
      tempVec.cross(new THREE.Vector3(0, 1, 0)).normalize();
      camRef.current.position.addScaledVector(tempVec, 2);
      camRef.current.position.y += 3;
    }
  }, [player]);

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
    const endPosition = path[nextPoint].clone();

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
    <>
      <group ref={ref} position={path[0]} rotation-y={rotationY} {...props}>
        {/* <Billboard player={player} position={[0, 2, 0]}>
          <Html wrapperClass={classNames(styles.wrapper, className)} center>
            <p>{state?.name}</p>
            <p>{state?.points} Points</p>
            <p>{state?.status?.name}</p>
          </Html>
        </Billboard> */}

        <Vehicule player={player} color={player.state?.profile?.color} />
      </group>
      {myPlayer()?.id === player.id && <PerspectiveCamera ref={camRef} makeDefault />}
    </>
  );
}

export default Player;
