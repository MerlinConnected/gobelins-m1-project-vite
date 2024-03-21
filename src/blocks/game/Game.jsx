import React, { useRef, useEffect, createRef, useState } from 'react';

import { Canvas } from '@react-three/fiber';
import { Loader, OrbitControls, Environment, Grid, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { Leva, useControls } from 'leva';
import { Suspense } from 'react';
import { Perf } from 'r3f-perf';

import Player from '../player/Player';

import { usePlayerContext } from '../../provider/PlayerProvider';
import { myPlayer } from 'playroomkit';

const Game = () => {
  const { players } = usePlayerContext();
  const me = myPlayer();

  const modelRefs = useRef([]);

  useEffect(() => {
    modelRefs.current = Array(players.length)
      .fill()
      .map((_, i) => modelRefs.current[i] || createRef());
  }, [players.length, modelRefs.current]);

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
      <Canvas className="canvas" shadows>
        <color attach="background" args={['#0A090F']} />
        <Suspense fallback={null}>
          <group>
            {players.map((player, i) => (
              <Player key={player.id} player={player} index={i} ref={modelRefs.current[player.id]} />
            ))}
          </group>

          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
          </GizmoHelper>

          <OrbitControls target={[0, 0, 0]} />
          <Environment preset="city" />
          {!isDebug && <Perf position="bottom-left" minimal className="performance-monitor" showGraph={false} />}
          <Grid
            args={[10, 10]}
            cellSize={0.5}
            cellThickness={1}
            cellColor={'#5c5c5c'}
            sectionSize={2}
            sectionThickness={1.5}
            sectionColor={'#8d4747'}
            fadeDistance={30}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid
          />
        </Suspense>
      </Canvas>
    </>
  );
};

export default React.memo(Game);
