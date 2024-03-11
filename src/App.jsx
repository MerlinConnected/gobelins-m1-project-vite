import React from 'react';

import { Suspense, useRef, useState, useEffect, createRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Loader, PerspectiveCamera } from '@react-three/drei';
import { Perf } from 'r3f-perf';

import UI from './bloks/UI/UI';
import Players from './bloks/players/Players';
import Lobby from './components/Lobby';

function Scene() {
  return (
    <>
      <Canvas shadows camera={{ position: [2, 2, 2] }}>
        <color attach="background" args={['#121212']} />
        <Suspense fallback={null}>
          {/* <Players /> */}
          <OrbitControls target={(0, 0, 0)} />
          <Environment preset="city" />
          <Perf position="bottom-left" minimal className="performance-monitor" />
        </Suspense>
      </Canvas>
      <Loader />
      <Lobby />
      {/* <UI /> */}
    </>
  );
}

export default React.memo(Scene);
