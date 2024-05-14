import React, { useEffect, useState } from 'react';

import { Loader, OrbitControls, Environment, Grid, GizmoHelper, GizmoViewport, Gltf } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Perf } from 'r3f-perf';
import { Leva } from 'leva';

import { usePlayerContext } from '../../provider/PlayerProvider';

import Tiles from '../paths/Paths';

import { Selection, Select, EffectComposer, Outline } from '@react-three/postprocessing';

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
        <color attach="background" args={['#0b0b0b']} />
        <Suspense fallback={null}>
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
          </GizmoHelper>

          <Selection>
            <EffectComposer multisampling={8} autoClear={false}>
              <Outline blur visibleEdgeColor="purple" edgeStrength={100} width={1000} />
            </EffectComposer>
            <Tiles players={players} amount={17} />
          </Selection>

          <OrbitControls target={[0, 0, 0]} />
          <Environment preset="city" />
          {!isDebug && <Perf position="bottom-left" minimal className="performance-monitor" showGraph={false} />}
          <Grid
            args={[5, 5]}
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
