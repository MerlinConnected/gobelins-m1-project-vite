import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Vector3, CubicBezierCurve3, CatmullRomCurve3 } from 'three';
import { Flow, modifyShader } from 'three/examples/jsm/modifiers/CurveModifier.js';
import Player from '../player/Player';

function Tiles({ players, amount, ...props }) {
  const ref = useRef();
  const modelRefs = useRef([]);

  return (
    <group ref={ref} {...props}>
      {players.map((player, i) => (
        <Player key={player.id} player={player} index={i} ref={modelRefs.current[player.id]} />
      ))}
    </group>
  );
}

export default Tiles;
