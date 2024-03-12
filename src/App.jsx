import React from 'react';

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, OrbitControls, Environment } from '@react-three/drei';
import { Leva } from 'leva';
import { Suspense } from 'react';
import { Perf } from 'r3f-perf';

import UI from './blocks/ui/UI';
import Lobby from './blocks/lobby/Lobby';
import Players from './blocks/players/Players';

import { useMultiplayerState } from 'playroomkit';

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
        <Suspense fallback={null}>
          {gameState === 'game' && <Players />}
          <OrbitControls target={(0, 0, 0)} />
          <Environment preset="city" />
          {!isDebug && <Perf position="bottom-left" minimal className="performance-monitor" showGraph={false} />}
        </Suspense>
      </Canvas>

      {gameState === 'lobby' && <Lobby />}
      {/* <Lobby /> */}
      {gameState === 'game' && <UI />}
    </>
  );
}

export default React.memo(Scene);
