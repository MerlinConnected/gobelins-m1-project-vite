import React from 'react';

import { Suspense, useRef, useState, useEffect, createRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Loader, PerspectiveCamera } from '@react-three/drei';
import { Perf } from 'r3f-perf';

import UI from './blocks/ui/UI';
import Players from './blocks/players/Players';
import Lobby from './blocks/lobby/Lobby';
import { Leva } from 'leva';

function Scene() {
  const [isDebug, setisDebug] = useState(true);

  useEffect(() => {
    const url = new URL(window.location.href);

    const isDebugMode = url.searchParams.has('debug');

    setisDebug(!isDebugMode);
  }, []);

  return (
    <>
      <Canvas shadows camera={{ position: [2, 2, 2] }}>
        <color attach="background" args={['#121212']} />
        <Suspense fallback={null}>
          {/* <Players /> */}
          <OrbitControls target={(0, 0, 0)} />
          <Environment preset="city" />
          {!isDebug && <Perf position="bottom-left" minimal className="performance-monitor" showGraph={false} />}
        </Suspense>
      </Canvas>
      <Leva hidden={isDebug} />
      <Loader />
      <Lobby />
      {/* <UI /> */}
    </>
  );
}

export default React.memo(Scene);
