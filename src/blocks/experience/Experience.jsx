import React from 'react';

import { Suspense } from 'react';
import { OrbitControls, Environment } from '@react-three/drei';
import { Perf } from 'r3f-perf';

function Experience() {
  return (
    <Suspense fallback={null}>
      {gameState === 'game' && <Players />}
      <OrbitControls target={(0, 0, 0)} />
      <Environment preset="city" />
      {!isDebug && <Perf position="bottom-left" minimal className="performance-monitor" showGraph={false} />}
    </Suspense>
  );
}

export default React.memo(Experience);
