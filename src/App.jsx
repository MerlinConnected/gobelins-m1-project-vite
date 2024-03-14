import React from 'react';

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, OrbitControls, Environment, Plane } from '@react-three/drei';
import { Leva } from 'leva';
import { Suspense } from 'react';
import { Perf } from 'r3f-perf';

import UI from './blocks/ui/UI';
import Game from './blocks/game/Game';
import Lobby from './blocks/lobby/Lobby';
import Onboarding from './blocks/onboarding/Onboarding';
import { useGameStateContext } from './provider/GameStateProvider';
import { GAME_PHASE } from './utils/constants';
import InfoLobby from './blocks/info-lobby/InfoLobby';

function Scene() {
  const { onboarding, infoLobby, lobby, globalPhase } = useGameStateContext();
  const [isDebug, setisDebug] = useState(true);

  useEffect(() => {
    const url = new URL(window.location.href);

    const isDebugMode = url.searchParams.has('debug');

    setisDebug(!isDebugMode);
  }, []);
  return (
    <>
      {onboarding && <Onboarding />}
      {infoLobby && <InfoLobby />}
      {lobby && <Lobby />}

      <Leva hidden={isDebug} />
      <Loader />
      <Canvas className="canvas" shadows>
        <color attach="background" args={['#efd8bd']} />
        <Suspense fallback={null}>
          {globalPhase === GAME_PHASE.startGame && <Game />}
          <OrbitControls target={(0, 0, 0)} />
          <Environment preset="city" />
          {!isDebug && <Perf position="bottom-left" minimal className="performance-monitor" showGraph={false} />}

          <mesh position-z={-3} rotation-x={-Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshBasicMaterial color="greenyellow" />
          </mesh>
        </Suspense>
      </Canvas>
      {globalPhase === GAME_PHASE.startGame && <UI />}
    </>
  );
}

export default React.memo(Scene);
