import React, { useRef, useEffect, createRef, useState } from 'react';

import { Canvas } from '@react-three/fiber';
import { Loader, OrbitControls, Environment, Plane, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { Leva } from 'leva';
import { Suspense } from 'react';
import { Perf } from 'r3f-perf';

import Player from '../player/Player';

import { usePlayerContext } from '../../provider/PlayerProvider';
import { myPlayer } from 'playroomkit';

const Game = () => {
  const { players } = usePlayerContext();
  const me = myPlayer();

  const modelRefs = useRef([]);

  useEffect(() => {
    modelRefs.current = Array(players.length)
      .fill()
      .map((_, i) => modelRefs.current[i] || createRef());
  }, [players.length, modelRefs.current]);

  const [isDebug, setisDebug] = useState(true);

  useEffect(() => {
    const url = new URL(window.location.href);

    const isDebugMode = url.searchParams.has('debug');

    setisDebug(!isDebugMode);
  }, []);

  let cubes = [
    [0, 0, 10],
    [10, 0, 0],
    [0, 0, -10],
    [-10, 0, 0],
  ];

  return (
    <>
      <Leva hidden={isDebug} />
      <Loader />
      <Canvas className="canvas" shadows>
        <color attach="background" args={['#efd8bd']} />
        <Suspense fallback={null}>
          <group>
            {players.map((player, i) => (
              <Player key={player.id} player={player} index={i} ref={modelRefs.current[player.id]} />
            ))}
          </group>

          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
          </GizmoHelper>

          <group>
            {cubes.map(([x, y, z], i) => (
              <mesh key={i} position={[x, y, z]} castShadow receiveShadow>
                <boxGeometry args={[1, 0.1, 1]} />
                <meshStandardMaterial color="red" />
              </mesh>
            ))}
          </group>
          <OrbitControls target={[0, 0, 0]} />
          <Environment preset="city" />
          {!isDebug && <Perf position="bottom-left" minimal className="performance-monitor" showGraph={false} />}

          <mesh rotation-x={-Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshBasicMaterial color="greenyellow" />
          </mesh>
        </Suspense>
      </Canvas>
    </>
  );
};

export default React.memo(Game);
