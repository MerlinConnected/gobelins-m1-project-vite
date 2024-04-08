import React, { useEffect, useMemo, useRef, useState, forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useGraph } from '@react-three/fiber';
import { SkeletonUtils } from 'three-stdlib';

export const Rails = forwardRef((props, ref) => {
  const { scene, materials } = useGLTF('/models/rails.glb');

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh castShadow receiveShadow geometry={nodes.Cube.geometry} material={nodes.Cube.material} />
    </group>
  );
});

useGLTF.preload('/models/rails.glb');
