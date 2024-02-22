import { Suspense, useRef, useState, useEffect, createRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Loader, PerspectiveCamera } from '@react-three/drei';

import UI from './components/UI';
import { Players } from './components/Players';

export default function Scene() {
  const ref = createRef();

  console.log('ref.current', ref);

  return (
    <>
      {/* <Canvas shadows camera={{ position: [2, 2, 2] }}> */}
      <Canvas shadows camera={{ manual: true }}>
        <PerspectiveCamera makeDefault position={[3, 3, 3]} />
        <Suspense fallback={null}>
          <Players ref={ref} />
          <OrbitControls target={(0, 0, 0)} />
          <ambientLight intensity={1} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <Loader />
      <UI />
    </>
  );
}
