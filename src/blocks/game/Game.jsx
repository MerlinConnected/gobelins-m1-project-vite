import React, { useEffect, useState } from 'react';

import { Loader, OrbitControls, Grid, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Perf } from 'r3f-perf';
import { Leva } from 'leva';

import { usePlayerContext } from '../../provider/PlayerProvider';

import Tiles from '../paths/Paths';

import Construction from '../../models/construction';
import Riverside from '../../models/riverside';
import Gare from '../../models/gare';
import NorthCity from '../../models/northcity';
import Monument from '../../models/monument';
import Garden from '../../models/garden';
import Routes from '../../models/routes';
import Environment from '../environment/Environment';
import Plateau from '../../models/plateau';
import { isHost } from 'playroomkit';

const Game = () => {
  const { players } = usePlayerContext();

  const [isDebug, setisDebug] = useState(true);

  useEffect(() => {
    // const url = new URL(window.location.href);

    const isDebugMode = isHost();

    setisDebug(!isDebugMode);
  }, []);

  return (
    <>
      <Leva hidden={isDebug} />
      <Loader />
      <Canvas className="canvas" shadows>
        <color attach="background" args={['#2d190d']} />
        <Suspense fallback={null}>
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
          </GizmoHelper>

          <Tiles players={players} amount={19.35} />

          <OrbitControls target={[0, -4, 0]} enableZoom={false} />
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
          {/* <fog attach="fog" args={['#2d190d', 10, 100]} /> */}

          <Environment />

          <group scale={0.5}>
            <Plateau />
            <Gare />
            <Construction />
            <Riverside />
            <NorthCity />
            <Monument />
            <Garden />
            <Routes />
          </group>
        </Suspense>
      </Canvas>
    </>
  );
};

export default React.memo(Game);
