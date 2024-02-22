import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Loader } from '@react-three/drei';
import { Leva, useControls } from 'leva';

import UI from './components/UI';

function Model() {
  const meshRef = useRef();

  const [hovered, hover] = useState(false);

  const { color } = useControls({
    color: {
      value: '#FF69B4',
      label: 'Color',
      format: (v) => v,
    },
  });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} scale={hovered ? 2 : 1}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} roughness={0} />
    </mesh>
  );
}

export default function Scene() {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 10, 0] }}>
        <Suspense fallback={null}>
          <Model />
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
