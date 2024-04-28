import React, { useMemo, useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import { myPlayer, usePlayerState } from 'playroomkit';
import { animate } from 'framer-motion';

import Billboard from '../../components/billboard/Billboard';
import Path from '../../utils/paths';
import { tilesPath } from '../../utils/tilesPath';
import getCurveFromPlayer from '../../utils/getCurveFromPlayer';

import { Model } from '../../models/car';

import { CornerTiles, StraightTiles } from '../tiles/Tiles';

function calculateRange(dataArray, score) {
  if (dataArray.length === 0) {
    return 0;
  }

  let lastIndex = 0;
  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i].index <= score) {
      lastIndex = i;
    }
  }

  if (lastIndex === 0 && dataArray[0].index > score) {
    return 0;
  }

  const range = lastIndex + 1;
  return range;
}

function Player({ player, index, ...props }) {
  const { position, rotationY } = props;
  const { id, state } = player;

  const ref = useRef();
  const camRef = useRef();
  const progress = useRef(0);
  const [prevPoints, setPrevPoints] = useState(0);
  const { scene } = useThree();

  const me = myPlayer();
  const [points] = usePlayerState(player, 'points');

  const cornerRange = calculateRange(tilesPath.corner, points);
  const straightRange = calculateRange(tilesPath.straight, points);

  const cameraPos = useMemo(() => {
    const pos = new THREE.Vector3(position[0], position[1], position[2]);
    return pos;
  }, [player]);

  let curve = useRef(null);

  const newArr = Path[index].map((p) => p.clone());

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

  useEffect(() => {
    let currentPoints = points;
    let tilesToMove = currentPoints - prevPoints;
    setPrevPoints(currentPoints);

    if (tilesToMove > 0 && currentPoints < Path[index].length) {
      console.log('plus');
      const newPointsArray = newArr.slice(prevPoints, prevPoints + tilesToMove);
      // console.log(newPointsArray);

      const playerPos = ref.current.position.clone();

      curve.current = getCurveFromPlayer(playerPos, newPointsArray);
      const geometry = new THREE.TubeGeometry(curve.current, 200, 0.1, 8, false);
      const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
      scene.add(mesh);

      animate(progress.current, 1, {
        duration: 2,
        onUpdate: (value) => {
          let pos = curve.current.getPointAt(value);
          ref.current.position.copy(pos);
          let tangent = curve.current.getTangentAt(value).normalize();
          pos.add(tangent);
          // ref.current.lookAt(pos);
        },
      });
    } else if (tilesToMove < 0) {
      console.log('moins');
      const newPointsArray = newArr.slice(prevPoints + tilesToMove, prevPoints);
      newPointsArray.reverse();

      // invert the x and z values of newPointsArray
      newPointsArray.forEach((point) => {
        point.x *= -1;
        point.y *= -1;
        point.z *= -1;
      });

      const playerPos = ref.current.position.clone();

      curve.current = getCurveFromPlayer(playerPos, newPointsArray, -1);

      const geometry = new THREE.TubeGeometry(curve.current, 200, 0.1, 8, false);
      const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
      scene.add(mesh);

      animate(progress.current, 1, {
        duration: 2,
        onUpdate: (value) => {
          let pos = curve.current.getPointAt(value);
          ref.current.position.copy(pos);
          let tangent = curve.current.getTangentAt(value).normalize();
          pos.add(tangent);
          // ref.current.lookAt(pos);
        },
      });
    }
  }, [points]);

  return (
    <>
      <group ref={ref} rotation-y={rotationY} {...props}>
        <Billboard player={player} position={[0, 2, 0]} />
        <Model color={state?.profile?.color} />
      </group>
      {me?.id === id && <PerspectiveCamera ref={camRef} makeDefault />}
      <CornerTiles data={tilesPath.corner} range={cornerRange} />
      <StraightTiles data={tilesPath.straight} range={straightRange} />
    </>
  );
}

export default Player;
