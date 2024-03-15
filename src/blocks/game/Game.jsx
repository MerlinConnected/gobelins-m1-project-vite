import React, { useRef, useEffect, createRef, useState } from 'react';

import { Canvas } from '@react-three/fiber';
import { Loader, OrbitControls, Environment, Plane } from '@react-three/drei';
import { Leva } from 'leva';
import { Suspense } from 'react';
import { Perf } from 'r3f-perf';

import Player from '../player/Player';

import { usePlayerContext } from '../../provider/PlayerProvider';

const Game = () => {
  const { players } = usePlayerContext();

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
          <OrbitControls target={(0, 0, 0)} />
          <Environment preset="city" />
          {!isDebug && <Perf position="bottom-left" minimal className="performance-monitor" showGraph={false} />}

          <mesh position-z={-3} rotation-x={-Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshBasicMaterial color="greenyellow" />
          </mesh>
        </Suspense>
      </Canvas>
    </>
  );
};

export default React.memo(Game);
