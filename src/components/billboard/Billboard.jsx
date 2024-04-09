import { useState, useRef, useEffect } from 'react';

import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

import { usePlayerContext } from '../../provider/PlayerProvider';

import classNames from 'classnames';
import styles from './Billboard.module.scss';

export default function Billboard({ player, className, ...props }) {
  const { state } = player;

  const planeRef = useRef();

  const [rank, setRank] = useState('');

  const game = usePlayerContext();

  useEffect(() => {
    if (game.useScoreboard.length) {
      const sortedPoints = [...game.useScoreboard].sort((a, b) => b.points - a.points);

      let currentRank = 1;
      let prevPoints = sortedPoints[0].points;
      let actualRank = 1;

      sortedPoints.forEach((player, index) => {
        if (player.points < prevPoints) {
          currentRank = actualRank;
          prevPoints = player.points;
        }
        if (player.name === state?.name || player.name === state?.profile?.name) {
          setRankWithSuffix(currentRank);
        }
        actualRank++;
      });
    }
  }, [game.useScoreboard]);

  const setRankWithSuffix = (rank) => {
    const ordinalSuffix = ['th', 'st', 'nd', 'rd'],
      v = rank % 100;
    setRank(`${rank}${ordinalSuffix[(v - 20) % 10] || ordinalSuffix[v] || ordinalSuffix[0]}`);
  };

  const direction = new THREE.Vector3();
  const cameraPositionProjection = new THREE.Vector3();

  useFrame(({ camera }) => {
    if (!planeRef.current) return;

    cameraPositionProjection.set(camera.position.x, planeRef.current.position.y, camera.position.z);
    direction.subVectors(cameraPositionProjection, planeRef.current.position).normalize();

    const angle = Math.atan2(direction.x, direction.z);

    planeRef.current.rotation.y = angle;
  });

  return (
    <>
      <group ref={planeRef} {...props}>
        <Html wrapperClass={classNames(styles.wrapper, className)} center>
          <p>{`${state?.name || state?.profile?.name} - ${rank}`}</p>
          <p>{state?.points} Points</p>
          <p>{state?.status.name}</p>
        </Html>
      </group>
    </>
  );
}
