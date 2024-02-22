import React, { useRef, useState, useEffect, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';

import { useControls } from 'leva';
import { useDaronEngine } from '../hooks/useDaronEngine';

import { Model } from '../models/car';

export const Players = forwardRef((props, ref) => {
  const { players } = useDaronEngine();

  return (
    <>
      {players.map((player, i) => {
        return <Model key={player.id} position={[-i * 1.5, 0, 0]} color={player.state.profile.color} ref={ref} />;
      })}
    </>
  );
});
