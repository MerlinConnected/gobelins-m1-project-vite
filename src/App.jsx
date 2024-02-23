import { Suspense, useRef, useState, useEffect, createRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Loader, PerspectiveCamera } from '@react-three/drei';
import { Perf } from 'r3f-perf';

import UI from './components/UI';
import Players from './components/Players';

export default function Scene() {
  return (
    <>
      <Canvas shadows camera={{ position: [2, 2, 2] }}>
        <Suspense fallback={null}>
          <Players />
          <OrbitControls target={(0, 0, 0)} />
          <ambientLight intensity={1} />
          <Environment preset="city" />
          <Perf position="bottom-left" minimal />
        </Suspense>
      </Canvas>
      <Loader />
      <UI />
    </>
  );
}
