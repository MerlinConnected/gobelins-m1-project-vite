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
import { usePlayerContext } from './provider/PlayerProvider';
import { useGameStateContext } from './provider/GameStateProvider';
import { GLOBAL_PHASE } from './utils/constants';

function Scene() {
  const { phase } = usePlayerContext();
  const { globalPhase } = useGameStateContext();
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
          {globalPhase === GLOBAL_PHASE.startGame && <Players />}
          <OrbitControls target={(0, 0, 0)} />
          <Environment preset="city" />
          {!isDebug && <Perf position="bottom-left" minimal className="performance-monitor" showGraph={false} />}
        </Suspense>
      </Canvas>

      {globalPhase === GLOBAL_PHASE.lobby && <Lobby />}
      {globalPhase === GLOBAL_PHASE.startGame && <UI />}
    </>
  );
}

export default React.memo(Scene);
