import React from 'react';

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { Leva } from 'leva';

import UI from './blocks/ui/UI';
import Lobby from './blocks/lobby/Lobby';

import { useMultiplayerState } from 'playroomkit';

import Experience from './blocks/experience/Experience';

function Scene() {
  const [gameState] = useMultiplayerState('gameState', 'lobby');
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
      <Canvas className="canvas" shadows camera={{ position: [2, 2, 2] }}>
        <color attach="background" args={['#121212']} />
        <Experience />
      </Canvas>

      {gameState === 'lobby' && <Lobby />}
      {/* <Lobby /> */}
      {gameState === 'game' && <UI />}
    </>
  );
}

export default React.memo(Scene);
