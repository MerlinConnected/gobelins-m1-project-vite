import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Vector3 } from 'three';

import { usePlayerState } from 'playroomkit';

import { Model } from '../../models/car';
import { usePlayerContext } from '../../provider/PlayerProvider';

function Player({ player, index, ...props }) {
  const { state } = player;
  const model = useRef();
  const planeRef = useRef();

  const [rank, setRank] = useState('');

  const game = usePlayerContext();

  const [points] = usePlayerState(player, 'points');

  const [progress, setProgress] = useState(new Vector3(-index * 1.5, 0, 0));

  useEffect(() => {
    const newPosition = new Vector3(-index * 1.5, 0, -points);
    const animationDuration = 0.5;

    const animate = () => {
      const start = progress.clone();
      const end = newPosition;
      const startTime = Date.now();

      const updatePosition = () => {
        const elapsedTime = (Date.now() - startTime) / (animationDuration * 1000);
        if (elapsedTime < 1) {
          setProgress(start.clone().lerp(end, elapsedTime));
          requestAnimationFrame(updatePosition);
        } else {
          setProgress(end);
        }
      };
      updatePosition();
    };

    animate();
  }, [points]);

  const direction = new THREE.Vector3();
  const cameraPositionProjection = new THREE.Vector3();

  useFrame(({ camera }) => {
    if (!model.current || !planeRef.current) return;

    cameraPositionProjection.set(camera.position.x, planeRef.current.position.y, camera.position.z);
    direction.subVectors(cameraPositionProjection, planeRef.current.position).normalize();

    const angle = Math.atan2(direction.x, direction.z);

    planeRef.current.rotation.y = angle;
  });

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

  return (
    <>
      <group position={progress} ref={model} {...props}>
        <Model color={state?.profile?.color} />
        <group ref={planeRef} position={[0, 1, 0]}>
          <Html wrapperClass={'wrapper'} center>
            <p style={{ color: 'white' }}>{`${state?.name || state?.profile?.name} - ${rank}`}</p>
          </Html>
        </group>
      </group>
    </>
  );
}

export default React.memo(Player);
