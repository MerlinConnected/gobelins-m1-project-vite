import React, { useRef, useEffect, createRef, useState } from 'react';

import { Canvas } from '@react-three/fiber';
import { Loader, OrbitControls, Environment, Plane, Grid } from '@react-three/drei';
import { Leva, useControls } from 'leva';
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

  const { gridSize, ...gridConfig } = useControls({
    gridSize: [10, 10],
    cellSize: { value: 0.5, min: 0, max: 10, step: 0.1 },
    cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
    cellColor: '#5c5c5c',
    sectionSize: { value: 2, min: 0, max: 10, step: 0.1 },
    sectionThickness: { value: 1.5, min: 0, max: 5, step: 0.1 },
    sectionColor: '#8d4747',
    fadeDistance: { value: 20, min: 0, max: 100, step: 1 },
    fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
    followCamera: false,
    infiniteGrid: true,
  });

  return (
    <>
      <Leva hidden={isDebug} />
      <Loader />
      <Canvas className="canvas" shadows camera={{ position: [-5, 2, 5] }}>
        <color attach="background" args={['#0A090F']} />
        <Suspense fallback={null}>
          <group>
            {players.map((player, i) => (
              <Player key={player.id} player={player} index={i} ref={modelRefs.current[player.id]} />
            ))}
          </group>
          <OrbitControls target={(0, 0, 0)} />
          <Environment preset="city" />
          {!isDebug && <Perf position="bottom-left" minimal className="performance-monitor" showGraph={false} />}

          <Grid args={[10, 10]} {...gridConfig} />
        </Suspense>
      </Canvas>
    </>
  );
};

export default React.memo(Game);
