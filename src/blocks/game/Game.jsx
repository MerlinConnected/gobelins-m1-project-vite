import React, { useEffect, useState } from 'react';

import { Loader, OrbitControls, Grid, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Perf } from 'r3f-perf';
import { Leva } from 'leva';

import { usePlayerContext } from '../../provider/PlayerProvider';

import Tiles from '../paths/Paths';

import Environment from '../environment/Environment';
import Sol from '../../models/sol';
import Jardin from '../../models/jardin';
import Beige from '../../models/beige';
import Grey from '../../models/grey';
import Blue from '../../models/blue';
import Building from '../../models/building';
import River from '../../models/river';
import Place from '../../models/place';
import Support from '../../models/support';
import { isHost } from 'playroomkit';

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
      <Leva hidden={!isHost()} />
      <Loader />
      <Canvas className="canvas" shadows>
        <color attach="background" args={['#b7a7a1']} />
        <Suspense fallback={null}>
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
          </GizmoHelper>

          <Tiles players={players} amount={15} />

          <OrbitControls target={[0, -2, 0]} minDistance={35} maxDistance={35} minPolarAngle={1} maxPolarAngle={1} />
          {!isDebug && <Perf position="bottom-left" minimal className="performance-monitor" showGraph={false} />}

          {/* <Grid
            args={[5, 5]}
            cellSize={0.5}
            cellThickness={1}
            cellColor={'#76492b'}
            sectionSize={2}
            sectionThickness={1.5}
            sectionColor={'#523622'}
            fadeDistance={50}
            fadeStrength={0.5}
            followCamera={false}
            infiniteGrid
          /> */}

          {/* fog */}
          <fog attach="fog" args={['#b7a7a1', 40, 55]} />

          <Environment />

          <group scale={0.5}>
            <Sol />
            <Jardin />
            <Beige />
            <Grey />
            <Blue />
            <Building />
            <River />
            <Place />
            <Support />
          </group>
        </Suspense>
      </Canvas>
    </>
  );
};

export default React.memo(Game);
