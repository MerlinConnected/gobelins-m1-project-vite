import React, { useRef, useEffect, createRef, useState } from 'react';

import { Canvas } from '@react-three/fiber';
import { Loader, OrbitControls, Environment, Grid, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { Leva, useControls } from 'leva';
import { Suspense } from 'react';
import { Perf } from 'r3f-perf';

import { usePlayerContext } from '../../provider/PlayerProvider';
import { myPlayer } from 'playroomkit';
import Tiles from '../tiles/Tiles';

const Game = () => {
  const { players } = usePlayerContext();

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
        <color attach="background" args={['#f9efc7']} />
        <Suspense fallback={null}>
          <Tiles players={players} amount={16} />

          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
          </GizmoHelper>

          <OrbitControls target={[0, 0, 0]} />
          <Environment preset="city" />
          {!isDebug && <Perf position="bottom-left" minimal className="performance-monitor" showGraph={false} />}
          <Grid
            args={[10, 10]}
            cellSize={0.5}
            cellThickness={1}
            cellColor={'#5c5c5c'}
            sectionSize={2}
            sectionThickness={1.5}
            sectionColor={'#8d4747'}
            fadeDistance={50}
            fadeStrength={0.5}
            followCamera={false}
            infiniteGrid
          />
        </Suspense>
      </Canvas>
    </>
  );
};

export default React.memo(Game);
