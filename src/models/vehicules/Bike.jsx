import React, { useMemo, forwardRef, useState } from 'react';

import { Select } from '@react-three/postprocessing';
import { useGraph } from '@react-three/fiber';
import { SkeletonUtils } from 'three-stdlib';
import { Image, useGLTF } from '@react-three/drei';
import { DoubleSide } from 'three';
import Billboard from '../../components/billboard/Billboard';

export const Bike = forwardRef((props, ref) => {
  const [hovered, hover] = useState(null);

  const { scene, materials } = useGLTF('/models/car_low_poly.glb');

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  return (
    <group
      onPointerOver={() => {
        hover(true), console.log('hovered');
      }}
      onPointerOut={() => {
        hover(false), console.log('not hovered');
      }}
      {...props}
      ref={ref}
      dispose={null}
      position={[0, 0.45, 0]}
    >
      <Billboard>
        <Image url="/images/vehicules/bike/bike.png" side={DoubleSide} transparent />
      </Billboard>
    </group>
  );
});

useGLTF.preload('/models/car_low_poly.glb');
