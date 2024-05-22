import React, { useEffect, useState } from 'react';

import { Canvas } from '@react-three/fiber';
import { Loader, OrbitControls, Grid, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { Leva } from 'leva';
import { Suspense } from 'react';
import { Perf } from 'r3f-perf';

import { usePlayerContext } from '../../provider/PlayerProvider';

import Paths from '../paths/Paths';

import { Construction } from '../../models/construction';
import { Riverside } from '../../models/riverside';
import { TrainStation } from '../../models/trainstation';
import { NorthCity } from '../../models/northcity';
import { Monument } from '../../models/monument';
import { Garden } from '../../models/garden';
import { Routes } from '../../models/routes';
import Environment from '../environment/Environment';

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
        <color attach="background" args={['#503727']} />
        <Suspense fallback={null}>
          <Paths players={players} amount={17} />

          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
          </GizmoHelper>

          <OrbitControls target={[0, 0, 0]} />
          {!isDebug && <Perf position="bottom-left" minimal className="performance-monitor" showGraph={false} />}

          <Grid
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
          />

          <Environment />

          {/* Floor */}
          {/* <mesh position-y={0} rotation-x={- Math.PI * 0.5} scale={100}>
            <planeGeometry />
            <meshStandardMaterial color="#7e614b" />
          </mesh> */}

          <TrainStation />
          <Construction />
          <Riverside />
          <NorthCity />
          <Monument />
          <Garden />
          <Routes />

        </Suspense>
      </Canvas >
    </>
  );
};

export default React.memo(Game);
