import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Loader } from '@react-three/drei';
import { Leva, useControls } from 'leva';

import { isHost, myPlayer } from 'playroomkit';
import { useDaronEngine } from './hook/useDaronEngine';
import { useEffect } from 'react';

const DEBUG = true;
const handleClick = (direction) => {
  console.log('click', direction);
};

function UI() {
  const { phase, startGame, timer, playerTurn, players, points } = useDaronEngine();
  const [disabled, setDisabled] = useState(false);

  const currentPlayer = players[playerTurn];
  const me = myPlayer();

  console.log('playerTurn', playerTurn);

  useEffect(() => {
    switch (phase) {
      case 'playerTurn':
        if (currentPlayer.id === me.id) {
          console.log('my turn');
          setDisabled(false);
        }
        break;
      default:
        setDisabled(true);
    }
  }, [phase]);

  return (
    <div style={{ position: 'absolute', top: 10, left: 10, color: 'white', display: 'flex', gap: '1rem' }}>
      <button
        onClick={() => {
          handleClick('forwards');
        }}
        disabled={disabled}
      >
        Avancer
      </button>
      <button
        onClick={() => {
          handleClick('backwards');
        }}
        disabled={disabled}
      >
        Reculer
      </button>
      {/* <span>Time left {timer}</span> */}
    </div>
  );
}

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
      <Leva hidden={!DEBUG || !isHost()} />
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
